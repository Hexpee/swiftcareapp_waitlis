// Run against a separate test database and a running production server only.
// DATABASE_URL=<test-db> TEST_BASE_URL=http://localhost:3000 node tests/integration.mjs
import assert from 'node:assert/strict';
import pg from 'pg';
const base=process.env.TEST_BASE_URL;
if(!base || !process.env.DATABASE_URL) throw new Error('Explicit TEST_BASE_URL and test DATABASE_URL required.');
const email=`integration-${Date.now()}@example.com`;
const client=new pg.Client({connectionString:process.env.DATABASE_URL});await client.connect();
const send=async(payload,origin=base)=>fetch(`${base}/api/waitlist`,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(payload)});
try{
 const tokenResponse=await fetch(`${base}/api/waitlist`);assert.equal(tokenResponse.status,200);const {token}=await tokenResponse.json();await new Promise(r=>setTimeout(r,1600));
 const data={fullName:'Integration Test',email:email.toUpperCase(),phone:'',interest:'Patient',location:'',consent:true,website:'',token};
 assert.equal((await send(data,'https://wrong.example')).status,403);
 assert.equal((await send({...data,consent:false})).status,400);
 assert.equal((await send({...data,website:'bot'})).status,400);
 const responses=await Promise.all([send(data),send(data)]);assert.deepEqual(responses.map(r=>r.status),[200,200]);
 const rows=await client.query('SELECT * FROM waitlist_entries WHERE email=$1',[email]);assert.equal(rows.rowCount,1);assert.ok(rows.rows[0].consent_at);assert.equal(rows.rows[0].policy_version,'2026-09-08');
 for(let i=0;i<3;i++)assert.equal((await send(data)).status,200);
 assert.equal((await send(data)).status,429);
 console.log('PASS: origin, consent, spam, persistence, concurrent deduplication, consent audit and rate limiting');
}finally{await client.query('DELETE FROM waitlist_entries WHERE email=$1',[email]);await client.end();}
