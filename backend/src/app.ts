import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import helmet from 'helmet';

import { startServer } from './config/database.ts';

import loginRoutes from './routes/loginRoutes.ts';
import productsRoutes from './routes/productsRoutes.ts';

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
      helmet({
        contentSecurityPolicy: false,
      }),
    );
  }

  routes() {
    this.app.use('/login', loginRoutes);
    this.app.use('/products', productsRoutes);
  }

  async start() {
    await startServer();
  }
}

export default new App().app;
