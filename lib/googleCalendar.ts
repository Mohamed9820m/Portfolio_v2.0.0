// Google Calendar API integration
import { google } from 'googleapis';

interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
  timezone?: string;
  duration: string;
  notes?: string;
  meetingTitle?: string;
}

// Your Google OAuth credentials from environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google';

export async function createGoogleCalendarEvent(bookingData: BookingData) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );

    // You need to get a refresh token first
    // For now, this will throw an error until you set up OAuth
    // See instructions below
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    
    if (!refreshToken) {
      console.warn('Google refresh token not set. Event will be logged but not created in calendar.');
      console.log('Booking data:', bookingData);
      return {
        success: true,
        message: 'Booking received (Calendar integration pending)',
        meetLink: 'https://meet.google.com/xxx-xxxx-xxx'
      };
    }

    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Parse date and time
    const [year, month, day] = bookingData.date.split('-');
    const [hours, minutes] = parseTime(bookingData.time);

    const startDateTime = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      hours,
      minutes
    );

    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes

    // Use the user's timezone for the calendar event
    const userTimezone = bookingData.timezone || 'Europe/Berlin';
    
    console.log('📅 Creating calendar event in timezone:', userTimezone);

    const event = {
      summary: `${bookingData.meetingTitle || '30 Min Meeting'} with ${bookingData.name}`,
      description: bookingData.notes || `Meeting with ${bookingData.name}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: userTimezone, // User's timezone
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: userTimezone, // User's timezone
      },
      attendees: [
        { email: bookingData.email, displayName: bookingData.name }
      ],
      conferenceData: {
        createRequest: {
          requestId: `meeting-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 }
        ]
      }
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all'
    });

    const eventData = response.data;

    return {
      success: true,
      eventId: eventData.id,
      meetLink: eventData.hangoutLink || eventData.conferenceData?.entryPoints?.[0]?.uri,
      htmlLink: eventData.htmlLink
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

function parseTime(timeStr: string): [number, number] {
  // Parse "8:30am" or "2:00pm" format
  const match = timeStr.match(/(\d+):(\d+)(am|pm)/i);
  if (!match) return [0, 0];
  
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toLowerCase();
  
  if (period === 'pm' && hours !== 12) {
    hours += 12;
  } else if (period === 'am' && hours === 12) {
    hours = 0;
  }
  
  return [hours, minutes];
}

export async function sendBookingConfirmationEmail(bookingData: BookingData) {
  // Email sending implementation
  // You can use services like:
  // - Resend
  // - SendGrid
  // - Nodemailer
  
  /*
  Example with Resend:
  
  import { Resend } from 'resend';
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: bookingData.email,
    subject: 'Meeting Confirmed',
    html: `
      <h1>Your meeting is confirmed!</h1>
      <p>Date: ${bookingData.date}</p>
      <p>Time: ${bookingData.time}</p>
      <p>Duration: ${bookingData.duration}</p>
    `
  });
  */
  
  console.log('Would send email to:', bookingData.email);
  return { success: true };
}

