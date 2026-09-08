import pg from 'pg';
import {createHmac} from 'node:crypto';
const email=process.argv[2]?.trim().toLowerCase();
if(!email || !email.includes('@')) throw new Error('Usage: npm run db:remove -- person@example.com');
if(!process.env.DATABASE_URL || !process.env.WAITLIST_SECRET) throw new Error('Database and waitlist secret required.');
const client=new pg.Client({connectionString:process.env.DATABASE_URL});
try {await client.connect();await client.query('BEGIN');const result=await client.query('DELETE FROM waitlist_entries WHERE email=$1',[email]);const digest=createHmac('sha256',process.env.WAITLIST_SECRET).update(`email:${email}`).digest('hex');await client.query('DELETE FROM waitlist_rate_limits WHERE key=$1',[digest]);await client.query('COMMIT');console.log(`Removed ${result.rowCount} waitlist entry. Also remove from any email lists/exports and follow backup retention procedures.`);}finally{await client.end();}
