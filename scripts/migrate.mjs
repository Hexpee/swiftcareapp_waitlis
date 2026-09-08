import pg from 'pg';
import { readFile } from 'node:fs/promises';
if(!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL in .env or your environment.');
const client=new pg.Client({connectionString:process.env.DATABASE_URL});
try {await client.connect();await client.query('BEGIN');await client.query('SELECT pg_advisory_xact_lock(83168201)');await client.query(await readFile(new URL('../migrations/001_waitlist.sql',import.meta.url),'utf8'));await client.query('COMMIT');console.log('Waitlist migration applied successfully.');}catch(error){await client.query('ROLLBACK').catch(()=>{});throw error;}finally{await client.end();}
