import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBookingStatus } from '@/lib/bookingStorage';
import { createGoogleCalendarEvent } from '@/lib/googleCalendar';
import { sendUserConfirmationEmail, sendUserRejectionEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get('id');
    const action = searchParams.get('action'); // 'approve' or 'reject'

    if (!bookingId || !action) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invalid Request</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .error { color: #ef4444; font-size: 48px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="error">❌</div>
              <h1>Invalid Request</h1>
              <p>Missing booking ID or action parameter.</p>
            </div>
          </body>
        </html>
        `,
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Get the booking
    const booking = await getBookingById(bookingId);

    if (!booking) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Booking Not Found</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .error { color: #ef4444; font-size: 48px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="error">❌</div>
              <h1>Booking Not Found</h1>
              <p>This booking request does not exist or has already been processed.</p>
            </div>
          </body>
        </html>
        `,
        { status: 404, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Check if already processed
    if (booking.status !== 'pending') {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Already Processed</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .info { color: #f59e0b; font-size: 48px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="info">ℹ️</div>
              <h1>Already Processed</h1>
              <p>This booking has already been ${booking.status}.</p>
            </div>
          </body>
        </html>
        `,
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    if (action === 'approve') {
      // Create Google Calendar event in the user's timezone
      console.log('📅 Creating Google Calendar event...');
      console.log('📍 User timezone:', booking.timezone);
      const calendarEvent = await createGoogleCalendarEvent({
        name: booking.name,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        timezone: booking.timezone, // Use the user's timezone
        notes: booking.notes,
        duration: '30m',
        meetingTitle: '30 Min Meeting',
      });

      if (!calendarEvent) {
        return new NextResponse(
          `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Error Creating Event</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .error { color: #ef4444; font-size: 48px; margin-bottom: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="error">❌</div>
                <h1>Error Creating Calendar Event</h1>
                <p>Failed to create the Google Calendar event. Please check your Google Calendar API setup.</p>
              </div>
            </body>
          </html>
          `,
          { status: 500, headers: { 'Content-Type': 'text/html' } }
        );
      }

      // Send confirmation email to user (in their timezone)
      console.log('📧 Sending confirmation email to user...');
      await sendUserConfirmationEmail({
        name: booking.name,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        timezone: booking.timezone,
        notes: booking.notes,
        meetLink: calendarEvent.meetLink || undefined,
        meetingTitle: '30 Min Meeting',
      });

      // Update booking status
      updateBookingStatus(bookingId, 'approved');

      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Meeting Approved</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .success { color: #10b981; font-size: 48px; margin-bottom: 20px; }
              .button { display: inline-block; margin-top: 20px; padding: 12px 24px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">✅</div>
              <h1>Meeting Approved!</h1>
              <p>The meeting with <strong>${booking.name}</strong> has been confirmed.</p>
              <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
              <strong>Time:</strong> ${booking.time}</p>
              <p>The guest has been notified via email with the Google Meet link.</p>
              <a href="${calendarEvent.htmlLink}" class="button" target="_blank">View in Google Calendar</a>
            </div>
          </body>
        </html>
        `,
        { status: 200, headers: { 'Content-Type': 'text/html' } }
      );

    } else if (action === 'reject') {
      // Send rejection email to user (in their timezone)
      console.log('📧 Sending rejection email to user...');
      await sendUserRejectionEmail({
        name: booking.name,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        timezone: booking.timezone,
        notes: booking.notes,
      });

      // Update booking status
      updateBookingStatus(bookingId, 'rejected');

      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Meeting Rejected</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .info { color: #6b7280; font-size: 48px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="info">ℹ️</div>
              <h1>Meeting Rejected</h1>
              <p>The meeting request from <strong>${booking.name}</strong> has been declined.</p>
              <p>The guest has been notified via email.</p>
            </div>
          </body>
        </html>
        `,
        { status: 200, headers: { 'Content-Type': 'text/html' } }
      );
    } else {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invalid Action</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .error { color: #ef4444; font-size: 48px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="error">❌</div>
              <h1>Invalid Action</h1>
              <p>Action must be either 'approve' or 'reject'.</p>
            </div>
          </body>
        </html>
        `,
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

  } catch (error) {
    console.error('❌ Error in booking confirmation:', error);
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Server Error</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .error { color: #ef4444; font-size: 48px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error">❌</div>
            <h1>Server Error</h1>
            <p>An unexpected error occurred. Please try again later.</p>
          </div>
        </body>
      </html>
      `,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

