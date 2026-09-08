import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
function secret(){const s=process.env.WAITLIST_SECRET;if(!s || s.length<32 || s.startsWith('REPLACE_')) throw new Error('WAITLIST_SECRET must contain at least 32 characters');return s;}
export function hash(value:string){return createHmac('sha256',secret()).update(value).digest('hex');}
export function createToken(){const payload=`${Date.now()}.${randomBytes(16).toString('hex')}`;return `${payload}.${hash(payload)}`;}
export function validToken(token:string){const [time,nonce,sig,...rest]=token.split('.');if(rest.length || !/^\d{13}$/.test(time||'') || !/^[a-f0-9]{32}$/.test(nonce||'') || !/^[a-f0-9]{64}$/.test(sig||''))return false;const age=Date.now()-Number(time);return age>=1500 && age<7200000 && timingSafeEqual(Buffer.from(sig),Buffer.from(hash(`${time}.${nonce}`)));}
