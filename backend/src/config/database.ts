import 'dotenv/config';

import { Pool } from 'pg';

const connectionString =
  'postgresql://neondb_owner:npg_hArKG2U1LwFf@ep-silent-surf-actesa45.sa-east-1.aws.neon.tech/neondb?sslmode=verify-full';

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
