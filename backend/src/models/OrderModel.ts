import { pool } from '../config/database';

interface OrderItem {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
}

class OrderModel {
  static async create(userId: number, items: OrderItem[], total: number): Promise<number> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const orderResult = await client.query<{ id: number }>(
        'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id',
        [userId, total],
      );

      const orderId = orderResult.rows[0].id;

      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES ($1, $2, $3, $4, $5)',
          [orderId, item.product_id, item.product_name, item.price, item.quantity],
        );
      }

      await client.query('COMMIT');
      return orderId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

export default OrderModel;
