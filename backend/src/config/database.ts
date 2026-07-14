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

async function ensureOrdersTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      total NUMERIC(10,2) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}

async function ensureOrderItemsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      quantity INTEGER NOT NULL
    )
  `);
}

async function migrateOrderItemsTable(): Promise<void> {
  await pool.query(`
    ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_id INTEGER
  `);
}

// Initialization
export async function startServer() {
  try {
    await pool.query('SELECT 1');
    await ensureUsersTable();
    await ensureProductsTable();
    await ensureOrdersTable();
    await ensureOrderItemsTable();
    await migrateOrderItemsTable();
    await seedProducts();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exitCode = 1;
  }
}
