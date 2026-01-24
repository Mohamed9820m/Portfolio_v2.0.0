import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔍 Checking MongoDB environment variables...\n');

const mongodbUri = process.env.MONGODB_URI;
const emailUser = process.env.EMAIL_USER;

if (!mongodbUri) {
  console.error('❌ MONGODB_URI is not set in .env.local');
} else {
  console.log('✅ MONGODB_URI is set');
  // Mask sensitive parts of URI for display
  const maskedUri = mongodbUri.replace(/\/\/.*@/, '//****:****@');
  console.log('   URI:', maskedUri);
}

if (!emailUser) {
  console.error('❌ EMAIL_USER is not set in .env.local');
} else {
  console.log('✅ EMAIL_USER is set:', emailUser);
}

if (process.env.EMAIL_PASSWORD) {
  console.log('✅ EMAIL_PASSWORD is set (hidden)');
} else {
  console.error('❌ EMAIL_PASSWORD is not set in .env.local');
}

if (mongodbUri && emailUser && process.env.EMAIL_PASSWORD) {
  console.log('\n✅ Environment is configured for MongoDB migration!');
  console.log('   Try running: npx tsx scripts/test-connection.ts');
} else {
  console.error('\n⚠️ Environment is not fully configured.');
  process.exit(1);
}
