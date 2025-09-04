// Debug script to check if environment variables are available during build
// Load dotenv if a .env file exists (useful locally)
try {
  await import('dotenv/config');
} catch {}
console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL defined:', !!process.env.DATABASE_URL);
console.log('MODAL_KEY defined:', !!process.env.MODAL_KEY);
console.log('All env keys:', Object.keys(process.env).filter(key => 
  key.includes('DATABASE') || 
  key.includes('MODAL') || 
  key.includes('AWS') || 
  key.includes('POLAR') || 
  key.includes('BETTER')
));
console.log('===================================');
