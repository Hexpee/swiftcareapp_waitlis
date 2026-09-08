import { Pool } from 'pg';
const globalDb = globalThis as unknown as { waitlistPool?: Pool };
export function getPool() {
 if (!process.env.DATABASE_URL) throw new Error('Database is not configured');
 return globalDb.waitlistPool ??= new Pool({connectionString:process.env.DATABASE_URL,max:5,connectionTimeoutMillis:5000,idleTimeoutMillis:30000,statement_timeout:10000});
}
