import { NextRequest, NextResponse } from 'next/server';
import { createPendingBooking } from '@/lib/bookingStorage';
import { sendAdminApprovalEmail } from '@/lib/email';
import { convertToEuropeBerlin } from '@/lib/timezoneUtils';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('📝 New booking request received:', bookingData);
    console.log('🌍 User timezone:', bookingData.timezone);

    // Convert user's time to Europe/Berlin time for admin
    const userTimezone = bookingData.timezone || 'Europe/Berlin';
    const berlinTime = convertToEuropeBerlin(bookingData.date, bookingData.time, userTimezone);
    
    console.log('🕒 User time:', bookingData.time, 'in', userTimezone);
    console.log('🕒 Berlin time:', berlinTime.time, 'on', berlinTime.date);

    // Create pending booking with user's timezone info
    const pendingBooking = await createPendingBooking({
      name: bookingData.name,
      email: bookingData.email,
      date: bookingData.date,
      time: bookingData.time,
      timezone: userTimezone,
      notes: bookingData.notes,
    });

    console.log('✅ Pending booking created:', pendingBooking.id);

    // Send approval email to admin with both timezones
    try {
      console.log('📧 Sending approval request email to admin...');
      const adminEmailResult = await sendAdminApprovalEmail({
        bookingId: pendingBooking.id,
        name: pendingBooking.name,
        email: pendingBooking.email,
        date: pendingBooking.date,
        time: pendingBooking.time,
        timezone: userTimezone,
        berlinDate: berlinTime.date,
        berlinTime: berlinTime.time,
        notes: pendingBooking.notes,
        meetingTitle: '30 Min Meeting',
      });
      console.log('✅ Admin approval email result:', adminEmailResult);
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Booking request submitted successfully. You will receive a confirmation email once approved.',
        booking: {
          id: pendingBooking.id,
          status: 'pending',
          ...bookingData
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

