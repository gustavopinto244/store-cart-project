import { pool } from '../config/database';

interface Product {
  id: number;
  category: string;
  highlight: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  brand: string;
  type: string;
}

class ProductSearch {
  static async getAll(): Promise<Product[]> {
    try {
      const { rows } = await pool.query<Product>(`
        SELECT id, category, highlight, name, description, price, 
               price_value AS "priceValue", brand, type
        FROM products ORDER BY id
      `);
      return rows;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Error fetching products');
    }
  }

  static async getPricesByIds(ids: number[]): Promise<Map<number, number>> {
    const { rows } = await pool.query<{ id: number; price_value: number }>(
      'SELECT id, price_value FROM products WHERE id = ANY($1)',
      [ids],
    );
    const map = new Map<number, number>();
    for (const row of rows) {
      map.set(row.id, row.price_value);
    }
    return map;
  }
}

export default ProductSearch;
