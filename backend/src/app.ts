import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import helmet from 'helmet';

import { startServer } from './config/database.ts';

import loginRoutes from './routes/loginRoutes.ts';
import productsRoutes from './routes/productsRoutes.ts';
import checkoutRoutes from './routes/checkoutRoutes.ts';

class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.start();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
      }),
    );
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );
  }

  routes() {
    this.app.use('/login', loginRoutes);
    this.app.use('/products', productsRoutes);
    this.app.use('/checkout', checkoutRoutes);
  }

  async start() {
    await startServer();
  }
}

export default new App().app;
