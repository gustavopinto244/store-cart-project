import { Request, Response } from 'express';
import OrderModel from '../models/OrderModel.ts';

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

    const orderId = await OrderModel.create(parseInt(req.user._id, 10), items, total);

    res.status(201).json({ success: true, data: { orderId } });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ success: false, errors: ['Failed to process checkout.'] });
  }
}
