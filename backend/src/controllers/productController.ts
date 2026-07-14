import { Request, Response } from 'express';
import ProductSearch from '../models/ProductModel';

export async function getAllProducts(req: Request, res: Response): Promise<void> {
  try {
    const products = await ProductSearch.getAll();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, errors: ['Failed to fetch products.'] });
    console.error('Error in getAllProducts:', error);
  }
}
