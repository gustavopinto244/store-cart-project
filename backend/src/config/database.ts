import 'dotenv/config';

import { Pool } from 'pg';
import { seedProducts } from '../seed/seedProducts.ts';

const connectionString = process.env.DATABASE_URL || process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Missing required environment variable: DATABASE_URL or CONNECTION_STRING');
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error:', err);
});

// Ensure the tables exists
async function ensureUsersTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}

async function ensureProductsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL,
      highlight TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price TEXT NOT NULL,
      price_value NUMERIC(10,2) NOT NULL,
      brand TEXT NOT NULL,
      type TEXT NOT NULL
    )
  `);
}

// Initialization
export async function startServer() {
  try {
    await pool.query('SELECT 1');
    await ensureUsersTable();
    await ensureProductsTable();
    await seedProducts();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exitCode = 1;
  }
}
