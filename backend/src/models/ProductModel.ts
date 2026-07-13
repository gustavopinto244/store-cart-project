import { pool } from '../config/database.ts';

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
}

export default ProductSearch;
