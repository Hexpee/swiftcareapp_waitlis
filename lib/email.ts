export async function sendConfirmation(email:string){
 const key=process.env.RESEND_API_KEY,from=process.env.EMAIL_FROM;
 if(!key || !from)return;
 try {
 const res=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(5000),headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[email],subject:'You’re on the SwiftCare waitlist',text:'Thank you for joining the SwiftCare waitlist. We’ll keep you updated as we prepare to launch.\n\nSwiftCare has not launched yet. Launch details will be announced. To stop receiving updates and request removal, email info@swiftcareapp.com.\n\nTrifold Tech Limited\n42, Ogunsami Street, Surulere, Lagos. 101241, Nigeria'})});
 if(!res.ok)console.error('Waitlist confirmation provider rejected request:',res.status);
 }catch{console.error('Waitlist confirmation provider unavailable');}
}
