import 'dotenv/config';

import { Pool } from 'pg';

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

// Initialization
export async function startServer() {
  try {
    await pool.query('SELECT 1');
    await ensureUsersTable();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exitCode = 1;
  }
}
