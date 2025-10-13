import { getConnection, closeConnection } from '../lib/db';

async function testConnection() {
  console.log('🧪 Testing Azure SQL Database connection...\n');
  
  try {
    // Test connection
    console.log('1️⃣ Connecting to database...');
    const pool = await getConnection();
    console.log('   ✅ Connected successfully!\n');
    
    // Test query
    console.log('2️⃣ Testing query...');
    const result = await pool.request().query(`
      SELECT 
        TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE'
    `);
    
    console.log('   ✅ Query executed successfully!');
    console.log('   📊 Tables found:', result.recordset.length);
    console.log('   Tables:', result.recordset.map(r => r.TABLE_NAME).join(', ') || 'No tables yet\n');
    
    // Test bookings table if it exists
    const hasBookingsTable = result.recordset.some(r => r.TABLE_NAME === 'bookings');
    
    if (hasBookingsTable) {
      console.log('\n3️⃣ Testing bookings table...');
      const countResult = await pool.request().query(`
        SELECT COUNT(*) as count FROM bookings
      `);
      console.log('   ✅ Bookings table accessible!');
      console.log('   📊 Total bookings:', countResult.recordset[0].count);
    } else {
      console.log('\n⚠️  Bookings table not found. Run: npm run db:init');
    }
    
    console.log('\n✅ All tests passed! Your database is ready to use! 🎉');
    
  } catch (error) {
    console.error('\n❌ Connection test failed:', error);
    console.error('\n💡 Make sure:');
    console.error('   1. You created .env.local with SQL_PASSWORD=admin9820@');
    console.error('   2. Your Azure SQL firewall allows your IP address');
    console.error('   3. The database "porto" exists on portfolio12.database.windows.net');
    process.exit(1);
  } finally {
    await closeConnection();
  }
}

testConnection();

