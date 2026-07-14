import { Router } from 'express';
import { checkout } from '../controllers/checkoutController.ts';
import { requireAuth } from '../middlewares/auth.ts';

const router = Router();

router.post('/', requireAuth, checkout);

export default router;
