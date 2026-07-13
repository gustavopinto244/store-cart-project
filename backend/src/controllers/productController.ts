import ProductSearch from '../models/ProductModel.ts';

export async function getAllProducts(_req, res) {
  try {
    const products = await ProductSearch.getAll();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: ['Failed to fetch products.'] });
  }
}
