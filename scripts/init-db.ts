import { initializeDatabase, closeConnection } from '../lib/db';

async function main() {
  console.log('🚀 Starting database initialization...\n');
  
  try {
    await initializeDatabase();
    console.log('\n✅ Database initialization completed successfully!');
  } catch (error) {
    console.error('\n❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await closeConnection();
    process.exit(0);
  }
}

main();

