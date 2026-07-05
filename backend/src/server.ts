// Importing necessary modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

// Security
//import helmet from 'helmet';
//import cors from 'cors-cors';

// Database
import { pool } from './config/database.ts';

// Middlewares
import { sessionMiddleware } from './config/session.ts';
import { flashMiddleware } from './middlewares/flash.ts';

// Routes
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1); // Trust first proxy if behind a reverse proxy

// Middlewares for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware use
app.use(sessionMiddleware);
app.use(flashMiddleware);

// Active routes
app.use(routes);

// Initialization
async function startServer() {
  try {
    await pool.query('SELECT 1');
    console.log('Connected to the database.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
    process.exitCode = 1;
  }
}

console.log('Server is starting...');
void startServer();
