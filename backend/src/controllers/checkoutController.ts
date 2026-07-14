import { Request, Response } from 'express';
import OrderModel from '../models/OrderModel';
import ProductSearch from '../models/ProductModel';

export async function checkout(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, errors: ['Authentication required.'] });
      return;
    }

    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, errors: ['Cart must contain at least one item.'] });
      return;
    }

    if (typeof total !== 'number' || total <= 0) {
      res.status(400).json({ success: false, errors: ['Invalid total amount.'] });
      return;
    }

    const productIds = items.map((i: { product_id: number }) => i.product_id);
    const serverPrices = await ProductSearch.getPricesByIds(productIds);

    for (const item of items) {
      const serverPrice = serverPrices.get(item.product_id);
      if (serverPrice === undefined) {
        res.status(400).json({ success: false, errors: [`Product ID ${item.product_id} not found.`] });
        return;
      }
      if (Math.abs(serverPrice - item.price) > 0.01) {
        res.status(400).json({ success: false, errors: ['Price mismatch. Please review your cart.'] });
        return;
      }
    }

    const orderId = await OrderModel.create(req.user._id, items, total);

    res.status(201).json({ success: true, data: { orderId } });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ success: false, errors: ['Failed to process checkout.'] });
  }
}
