import { z } from 'zod';
export const POLICY_VERSION = '2026-09-08';
export const waitlistSchema = z.object({
 fullName: z.string().trim().min(2,'Enter your full name.').max(100,'Use 100 characters or fewer.'),
 email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(254),
 phone: z.string().trim().max(30).refine(v=>!v || /^[+()\d\s-]{7,30}$/.test(v),'Enter a valid phone number.').default(''),
 interest: z.enum(['Patient','Doctor','Pharmacy Partner'],{error:'Choose your interest.'}),
 location: z.string().trim().max(100,'Use 100 characters or fewer.').default(''),
 consent: z.literal(true,{error:'Please consent to launch updates to join.'}),
 website: z.string().max(0,'Unable to accept this submission.').default(''),
 token: z.string().min(1).max(300)
});
