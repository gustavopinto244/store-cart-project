import { Router } from 'express';
import { loginController } from '../controllers/loginController';

const router = Router();

router.post('/login', loginController.login);
router.post('/register', loginController.register);
router.post('/logout', loginController.logout);

export default router;
