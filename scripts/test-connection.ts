import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import dbConnect from '../lib/mongodb';
import mongoose from 'mongoose';

async function testConnection() {
  console.log('🧪 Testing MongoDB Atlas connection...\n');

  try {
    // Test connection
    console.log('1️⃣ Connecting to MongoDB...');
    const conn = await dbConnect();
    console.log('   ✅ Connected successfully!\n');

    // Test query
    console.log('2️⃣ Checking Collections...');
    const collections = await mongoose.connection.db?.listCollections().toArray();

    console.log('   ✅ Query executed successfully!');
    console.log('   📊 Collections found:', collections?.length || 0);
    console.log('   Collections:', collections?.map(c => c.name).join(', ') || 'No collections yet\n');

    // Check bookings collection
    const hasBookings = collections?.some(c => c.name === 'bookings');

    if (hasBookings) {
      console.log('\n3️⃣ Testing bookings collection...');
      const count = await mongoose.connection.db?.collection('bookings').countDocuments();
      console.log('   ✅ Bookings collection accessible!');
      console.log('   📊 Total bookings:', count);
    } else {
      console.log('\n⚠️  Bookings collection not found. It will be created when the first booking is saved.');
    }

    console.log('\n✅ All tests passed! Your MongoDB Atlas is ready to use! 🎉');

  } catch (error) {
    console.error('\n❌ Connection test failed:', error);
    console.error('\n💡 Make sure:');
    console.error('   1. You created .env.local with MONGODB_URI');
    console.error('   2. Your MongoDB Atlas network access allows your IP address');
    console.error('   3. Your connection string is correct');
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
