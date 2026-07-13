// Importing necessary modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

// Security
import helmet from 'helmet';
//import cors from 'cors-cors';

// Database
import { startServer } from './config/database.ts';

// Middlewares
import { sessionMiddleware } from './config/session.ts';

// Routes
import loginRoutes from './routes/loginRoutes.ts';

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
    this.app.use(sessionMiddleware);
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );
  }

  routes() {
    this.app.use('/login', loginRoutes);
  }

  async start() {
    await startServer();
  }
}

export default new App().app;
