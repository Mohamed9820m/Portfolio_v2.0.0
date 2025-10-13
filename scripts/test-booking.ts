import { createPendingBooking, getBookingById, getAllBookings } from '../lib/bookingStorage';
import { closeConnection } from '../lib/db';

async function testBooking() {
  console.log('🧪 Testing booking creation...\n');
  
  try {
    // Create a test booking
    console.log('1️⃣ Creating test booking...');
    const booking = await createPendingBooking({
      name: 'Test User',
      email: 'test@example.com',
      date: '2025-10-25',
      time: '10:00am',
      notes: 'Test booking',
    });
    
    console.log('✅ Booking created with ID:', booking.id);
    console.log('   Name:', booking.name);
    console.log('   Email:', booking.email);
    console.log('   Status:', booking.status);
    
    // Verify it was saved
    console.log('\n2️⃣ Retrieving booking from database...');
    const retrieved = await getBookingById(booking.id);
    
    if (retrieved) {
      console.log('✅ Booking retrieved successfully!');
      console.log('   ID matches:', retrieved.id === booking.id);
    } else {
      console.log('❌ Booking not found in database!');
    }
    
    // Show all bookings
    console.log('\n3️⃣ Getting all bookings...');
    const allBookings = await getAllBookings();
    console.log('✅ Total bookings in database:', allBookings.length);
    
    console.log('\n✅ All tests passed! 🎉');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  } finally {
    await closeConnection();
  }
}

testBooking();

