import { NextRequest, NextResponse } from 'next/server';
import { isIP } from 'node:net';
import {getPool} from '@/lib/db';
import {createToken,validToken,hash} from '@/lib/token';
import {waitlistSchema,POLICY_VERSION} from '@/lib/validation';
import {sendConfirmation} from '@/lib/email';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const reply=(body:object,status=200,headers:Record<string,string>={})=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store',...headers}});
export async function GET(){try{return reply({token:createToken()});}catch{return reply({message:'The waitlist is temporarily unavailable. Please try again later.'},503);}}
async function readBody(req:NextRequest){const reader=req.body?.getReader();if(!reader)throw new Error('body');let size=0;const chunks:Uint8Array[]=[];try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>8192){await reader.cancel();throw new Error('size');}chunks.push(value);}}finally{reader.releaseLock();}return JSON.parse(Buffer.concat(chunks).toString('utf8'));}
export async function POST(req:NextRequest){
 let origin:string;try{origin=new URL(process.env.APP_URL || '').origin;}catch{return reply({message:'The waitlist is temporarily unavailable. Please try again later.'},503);}
 if(req.headers.get('origin')!==origin)return reply({message:'Please submit the form from the SwiftCare website.'},403);
 if(!req.headers.get('content-type')?.startsWith('application/json'))return reply({message:'Expected a JSON submission.'},415);
 let body:unknown;try{body=await readBody(req);}catch{return reply({message:'Invalid or oversized submission.'},400);}
 const parsed=waitlistSchema.safeParse(body);
 if(!parsed.success)return reply({message:'Please check the form and try again.',errors:parsed.error.flatten().fieldErrors},400);
 const data=parsed.data;
 try{if(!validToken(data.token))return reply({message:'Please reload the page and try again. The form may have expired.'},400);}catch{return reply({message:'The waitlist is temporarily unavailable. Please try again later.'},503);}
 let client;let inserted=false;
 try{
 client=await getPool().connect();await client.query('BEGIN');
 // Only trust a header that your reverse proxy overwrites. Default is global + email limiting.
 const header=process.env.TRUSTED_IP_HEADER;const candidate=header ? req.headers.get(header)?.trim() : undefined;
 const limits=[{key:'global',seconds:60,max:100},{key:`email:${data.email}`,seconds:3600,max:5}];
 if(candidate && isIP(candidate))limits.push({key:`ip:${candidate}`,seconds:600,max:10});
 for(const limit of limits){const result=await client.query(`INSERT INTO waitlist_rate_limits(key,hits,expires_at) VALUES($1,1,now()+$2*interval '1 second') ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN waitlist_rate_limits.expires_at<=now() THEN 1 ELSE waitlist_rate_limits.hits+1 END, expires_at=CASE WHEN waitlist_rate_limits.expires_at<=now() THEN now()+$2*interval '1 second' ELSE waitlist_rate_limits.expires_at END RETURNING hits`,[hash(limit.key),limit.seconds]);
 if(result.rows[0].hits>limit.max){await client.query('COMMIT');return reply({message:'Too many attempts. Please try again later.'},429,{'Retry-After':String(limit.seconds)});}}
 await client.query('DELETE FROM waitlist_rate_limits WHERE expires_at < now()');
 const result=await client.query(`INSERT INTO waitlist_entries(full_name,email,phone,interest,location,policy_version) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(email) DO NOTHING RETURNING id`,[data.fullName,data.email,data.phone||null,data.interest,data.location||null,POLICY_VERSION]);
 inserted=Boolean(result.rowCount);await client.query('COMMIT');
 }catch{if(client)await client.query('ROLLBACK').catch(()=>{});console.error('Waitlist persistence failed');return reply({message:'We could not save your request. Please try again later.'},503);}finally{client?.release();}
 // Both new and duplicate responses require a successful database transaction.
 if(inserted)await sendConfirmation(data.email);
 return reply({message:'Thank you for joining the SwiftCare waitlist. We’ll keep you updated as we prepare to launch.'});
}
