// Quick script to verify environment variables are loaded correctly

console.log('🔍 Checking environment variables...\n');

const sqlPassword = process.env.SQL_PASSWORD;

if (!sqlPassword) {
  console.error('❌ SQL_PASSWORD is not set in .env.local');
  console.error('\n💡 Make sure you have .env.local file in project root with:');
  console.error('   SQL_PASSWORD=admin9820@');
  process.exit(1);
}

console.log('✅ SQL_PASSWORD is set');
console.log('   Length:', sqlPassword.length, 'characters');
console.log('   First 5 chars:', sqlPassword.substring(0, 5));
console.log('   Contains @:', sqlPassword.includes('@') ? 'Yes' : 'No');

// Don't print the full password for security
console.log('\n📋 Connection details:');
console.log('   Server: portfolio12.database.windows.net');
console.log('   Database: porto');
console.log('   User: root44');
console.log('   Password: ****** (hidden)');

console.log('\n✅ Environment is configured!');
console.log('   Try running: npm run db:test');

