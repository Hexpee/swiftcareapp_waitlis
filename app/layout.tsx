import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/source-sans-3/latin-400.css';
import '@fontsource/source-sans-3/latin-600.css';
import './globals.css';
const url=process.env.APP_URL || 'http://localhost:3000';
export const metadata:Metadata={metadataBase:new URL(url),title:'SwiftCareapp — Healthcare that comes to you | Join the Waitlist',description:'Join the SwiftCareapp waitlist for planned remote consultations with verified doctors in Nigeria. A healthcare service by Trifold Tech Limited. Coming soon.',alternates:{canonical:'/'},openGraph:{type:'website',locale:'en_NG',siteName:'SwiftCareapp',title:'Healthcare that comes to you.',description:'SwiftCareapp is coming soon. Join the waitlist.',images:[{url:'/social-card.png',width:1200,height:630,alt:'SwiftCareapp — Coming soon. Healthcare that comes to you.'}]},twitter:{card:'summary_large_image',title:'SwiftCareapp — Coming soon',images:['/social-card.png']},icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
