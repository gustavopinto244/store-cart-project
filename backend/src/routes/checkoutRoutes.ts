import { Router } from 'express';
import { checkout } from '../controllers/checkoutController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/', requireAuth, checkout);

export default router;
