import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailData {
  name: string;
  email: string;
  date: string;
  time: string;
  timezone?: string;
  notes?: string;
  meetLink?: string;
  meetingTitle?: string;
}

interface PendingBookingEmailData {
  bookingId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  timezone?: string;
  berlinDate?: string;
  berlinTime?: string;
  notes?: string;
  meetingTitle?: string;
}

// Email to the USER (guest)
export async function sendUserConfirmationEmail(data: BookingEmailData) {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  try {
    const result = await resend.emails.send({
      from: 'Mohamed Habib <onboarding@resend.dev>', // Using Resend default for testing
      to: data.email,
      subject: `Meeting Confirmed - ${data.meetingTitle || '30 Min Meeting'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 16px;
                padding: 40px;
                color: white;
              }
              .content {
                background: white;
                border-radius: 12px;
                padding: 30px;
                margin-top: 20px;
                color: #333;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .title {
                font-size: 28px;
                font-weight: bold;
                margin: 0 0 10px 0;
              }
              .subtitle {
                font-size: 16px;
                opacity: 0.9;
                margin: 0;
              }
              .info-box {
                background: #f7f7f7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
              .info-row {
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .info-label {
                font-weight: 600;
                width: 120px;
                color: #666;
              }
              .info-value {
                color: #333;
                flex: 1;
              }
              .meet-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 14px 32px;
                border-radius: 8px;
                font-weight: 600;
                text-align: center;
                margin: 20px 0;
              }
              .notes-box {
                background: #fff9e6;
                border-left: 4px solid #ffc107;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                opacity: 0.8;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">✅ Meeting Confirmed!</h1>
                <p class="subtitle">Your meeting with Mohamed Habib has been scheduled</p>
              </div>
              
              <div class="content">
                <p>Hi ${data.name},</p>
                <p>Thank you for booking a meeting! Here are your meeting details:</p>
                
                <div class="info-box">
                  <div class="info-row">
                    <span class="info-label">📅 Date:</span>
                    <span class="info-value">${formattedDate}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">⏰ Time:</span>
                    <span class="info-value">${data.time}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">⏱️ Duration:</span>
                    <span class="info-value">30 minutes</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">🌍 Timezone:</span>
                    <span class="info-value">${data.timezone || 'Europe/Berlin'}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">📍 Location:</span>
                    <span class="info-value">Google Meet</span>
                  </div>
                </div>

                ${data.notes ? `
                  <div class="notes-box">
                    <strong>📝 Your Message:</strong>
                    <p style="margin: 10px 0 0 0;">${data.notes}</p>
                  </div>
                ` : ''}

                ${data.meetLink ? `
                  <div style="text-align: center;">
                    <a href="${data.meetLink}" class="meet-button">
                      🎥 Join Google Meet
                    </a>
                  </div>
                  <p style="text-align: center; font-size: 14px; color: #666;">
                    You'll also receive a Google Calendar invitation with the meeting link
                  </p>
                ` : ''}

                <p style="margin-top: 30px;">Looking forward to speaking with you!</p>
                <p style="margin: 5px 0;"><strong>Mohamed Habib</strong></p>
                <p style="margin: 5px 0; color: #666;">Full Stack Developer</p>
              </div>

              <div class="footer">
                <p>Need to reschedule? Please reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ User confirmation email sent to:', data.email);
    console.log('📧 User email result:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Error sending user email:', error);
    console.error('❌ Full error details:', JSON.stringify(error, null, 2));
    return { success: false, error };
  }
}

// Email to YOU (admin notification)
// Email for contact form submissions
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactFormEmail(data: ContactFormData) {
  console.log('🔍 Attempting to send contact form email with data:', {
    to: 'mohamedhabibmarouani8@gmail.com',
    from: data.name,
    email: data.email,
    subject: data.subject
  });

  try {
    const result = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Using Resend default for testing
      to: 'mohamedhabibmarouani8@gmail.com',
      replyTo: data.email, // This allows you to reply directly to the sender
      subject: `📬 New Message: ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 16px;
                padding: 40px;
                color: white;
              }
              .content {
                background: white;
                border-radius: 12px;
                padding: 30px;
                margin-top: 20px;
                color: #333;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .title {
                font-size: 28px;
                font-weight: bold;
                margin: 0 0 10px 0;
              }
              .badge {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 6px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
              }
              .info-box {
                background: #f7f7f7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
              .info-row {
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .info-label {
                font-weight: 600;
                width: 100px;
                color: #666;
              }
              .info-value {
                color: #333;
                flex: 1;
              }
              .message-box {
                background: #e8f4f8;
                border-left: 4px solid #2196f3;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .reply-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 12px 28px;
                border-radius: 8px;
                font-weight: 600;
                text-align: center;
                margin: 20px 0;
              }
              .timestamp {
                text-align: center;
                color: #999;
                font-size: 14px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">📬 New Contact Form Message</h1>
                <span class="badge">Portfolio Contact</span>
              </div>
              
              <div class="content">
                <h2 style="margin-top: 0;">Message Details</h2>
                
                <div class="info-box">
                  <div class="info-row">
                    <span class="info-label">👤 From:</span>
                    <span class="info-value"><strong>${data.name}</strong></span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">📧 Email:</span>
                    <span class="info-value"><a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a></span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">📝 Subject:</span>
                    <span class="info-value"><strong>${data.subject}</strong></span>
                  </div>
                </div>

                <div class="message-box">
                  <strong style="color: #2196f3; display: block; margin-bottom: 10px;">💬 Message:</strong>
                  <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
                </div>

                <div style="text-align: center;">
                  <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" class="reply-button">
                    ↩️ Reply to ${data.name}
                  </a>
                </div>

                <div class="timestamp">
                  Received: ${new Date().toLocaleString('en-US', { 
                    dateStyle: 'full', 
                    timeStyle: 'long' 
                  })}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Contact form email sent to admin');
    console.log('📧 Contact form email result:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    console.error('❌ Full error details:', JSON.stringify(error, null, 2));
    return { success: false, error };
  }
}

export async function sendAdminNotificationEmail(data: BookingEmailData) {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  console.log('🔍 Attempting to send admin email with data:', {
    to: 'mohamedhabibmarouani8@gmail.com',
    name: data.name,
    email: data.email,
    date: formattedDate,
    time: data.time
  });

  try {
    const result = await resend.emails.send({
      from: 'Booking System <onboarding@resend.dev>', // Using Resend default for testing
      to: 'mohamedhabibmarouani8@gmail.com',
      subject: `🔔 New Booking: ${data.name} - ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                border-radius: 16px;
                padding: 40px;
                color: white;
              }
              .content {
                background: white;
                border-radius: 12px;
                padding: 30px;
                margin-top: 20px;
                color: #333;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .title {
                font-size: 28px;
                font-weight: bold;
                margin: 0 0 10px 0;
              }
              .badge {
                display: inline-block;
                background: #10b981;
                color: white;
                padding: 6px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
              }
              .info-box {
                background: #f7f7f7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
              .info-row {
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .info-label {
                font-weight: 600;
                width: 120px;
                color: #666;
              }
              .info-value {
                color: #333;
                flex: 1;
              }
              .notes-box {
                background: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .action-buttons {
                display: flex;
                gap: 10px;
                margin: 20px 0;
              }
              .button {
                flex: 1;
                text-align: center;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                display: inline-block;
              }
              .button-primary {
                background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                color: white;
              }
              .button-secondary {
                background: #f0f0f0;
                color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">🔔 New Meeting Booked!</h1>
                <span class="badge">New Booking</span>
              </div>
              
              <div class="content">
                <h2 style="margin-top: 0;">Client Information</h2>
                
                <div class="info-box">
                  <div class="info-row">
                    <span class="info-label">👤 Name:</span>
                    <span class="info-value"><strong>${data.name}</strong></span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">📧 Email:</span>
                    <span class="info-value">${data.email}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">📅 Date:</span>
                    <span class="info-value">${formattedDate}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">⏰ Time:</span>
                    <span class="info-value">${data.time}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">⏱️ Duration:</span>
                    <span class="info-value">30 minutes</span>
                  </div>
                </div>

                ${data.notes ? `
                  <div class="notes-box">
                    <strong>📝 Client Message:</strong>
                    <p style="margin: 10px 0 0 0;">${data.notes}</p>
                  </div>
                ` : ''}

                <div class="action-buttons">
                  ${data.meetLink ? `
                    <a href="${data.meetLink}" class="button button-primary">
                      Join Meeting
                    </a>
                  ` : ''}
                  <a href="https://calendar.google.com" class="button button-secondary">
                    View Calendar
                  </a>
                </div>

                <p style="text-align: center; font-size: 14px; color: #666; margin-top: 20px;">
                  This event has been automatically added to your Google Calendar
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Admin notification email sent successfully');
    console.log('📧 Email result:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Error sending admin email:', error);
    console.error('❌ Full error details:', JSON.stringify(error, null, 2));
    return { success: false, error };
  }
}

// Email to ADMIN for pending booking approval
export async function sendAdminApprovalEmail(data: PendingBookingEmailData) {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const approveUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/bookings/confirm?id=${data.bookingId}&action=approve`;
  const rejectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/bookings/confirm?id=${data.bookingId}&action=reject`;

  try {
    console.log('📧 Sending admin approval request email to: mohamedhabibmarouani8@gmail.com');
    console.log('📋 Booking ID:', data.bookingId);
    
    const result = await resend.emails.send({
      from: 'Booking System <onboarding@resend.dev>', // Using Resend default for testing
      to: 'mohamedhabibmarouani8@gmail.com',
      subject: `🔔 New Meeting Request from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background: #f5f5f5;
              }
              .container {
                background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
                border-radius: 16px;
                padding: 40px;
                color: white;
              }
              .content {
                background: white;
                border-radius: 12px;
                padding: 30px;
                margin-top: 20px;
                color: #333;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .title {
                font-size: 28px;
                font-weight: bold;
                margin: 0 0 10px 0;
              }
              .subtitle {
                font-size: 16px;
                opacity: 0.9;
                margin: 0;
              }
              .info-box {
                background: #f7f7f7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
              .info-row {
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .info-label {
                font-weight: 600;
                width: 120px;
                color: #666;
              }
              .info-value {
                color: #333;
                flex: 1;
              }
              .button-container {
                text-align: center;
                margin: 30px 0;
                display: flex;
                gap: 15px;
                justify-content: center;
              }
              .button {
                display: inline-block;
                text-decoration: none;
                padding: 14px 32px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
                transition: transform 0.2s;
              }
              .button-approve {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
              }
              .button-reject {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
              }
              .button:hover {
                transform: translateY(-2px);
              }
              .warning {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                font-size: 14px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">New Meeting Request</h1>
                <p class="subtitle">Action Required</p>
              </div>

              <div class="content">
                <div class="warning">
                  <strong>⏰ Pending Approval:</strong> Please review this meeting request and take action.
                </div>

                <h2 style="color: #f59e0b; margin-top: 0;">Booking Details</h2>

                <div class="info-box">
                  <div class="info-row">
                    <span class="info-label">Guest:</span>
                    <span class="info-value"><strong>${data.name}</strong></span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${data.email}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Date:</span>
                    <span class="info-value"><strong>${formattedDate}</strong></span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">User's Time:</span>
                    <span class="info-value"><strong>${data.time}</strong> (${data.timezone || 'Europe/Berlin'})</span>
                  </div>
                  ${data.berlinTime && data.timezone !== 'Europe/Berlin' ? `
                  <div class="info-row" style="background: #fef3c7;">
                    <span class="info-label">🇩🇪 Your Time:</span>
                    <span class="info-value"><strong>${data.berlinTime}</strong> (Europe/Berlin)</span>
                  </div>
                  ` : ''}
                  <div class="info-row">
                    <span class="info-label">Meeting:</span>
                    <span class="info-value">${data.meetingTitle || '30 Min Meeting'}</span>
                  </div>
                  ${data.notes ? `
                  <div class="info-row">
                    <span class="info-label">Notes:</span>
                    <span class="info-value">${data.notes}</span>
                  </div>
                  ` : ''}
                </div>

                <div class="button-container">
                  <a href="${approveUrl}" class="button button-approve">
                    ✅ Approve & Create Meeting
                  </a>
                  <a href="${rejectUrl}" class="button button-reject">
                    ❌ Reject Request
                  </a>
                </div>

                <div class="footer">
                  <p><strong>What happens next?</strong></p>
                  <p style="margin: 5px 0;">
                    • If you <strong>approve</strong>: Google Calendar event will be created automatically and the guest will receive a confirmation email with the Google Meet link.
                  </p>
                  <p style="margin: 5px 0;">
                    • If you <strong>reject</strong>: The guest will receive a polite rejection email.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Admin approval email sent successfully');
    console.log('📧 Email result:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Error sending admin approval email:', error);
    console.error('❌ Full error details:', JSON.stringify(error, null, 2));
    return { success: false, error };
  }
}

// Email to USER when booking is rejected
export async function sendUserRejectionEmail(data: BookingEmailData) {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  try {
    const result = await resend.emails.send({
      from: 'Mohamed Habib <onboarding@resend.dev>',
      to: data.email,
      subject: `Meeting Request Update`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
                border-radius: 16px;
                padding: 40px;
                color: white;
              }
              .content {
                background: white;
                border-radius: 12px;
                padding: 30px;
                margin-top: 20px;
                color: #333;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .title {
                font-size: 28px;
                font-weight: bold;
                margin: 0 0 10px 0;
              }
              .info-box {
                background: #f7f7f7;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">Meeting Request Update</h1>
              </div>

              <div class="content">
                <p>Hi ${data.name},</p>

                <p>Thank you for your interest in scheduling a meeting. Unfortunately, I'm unable to accommodate your requested time slot for:</p>

                <div class="info-box">
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${data.time}</p>
                </div>

                <p>Please feel free to:</p>
                <ul>
                  <li>Choose a different time slot on my calendar</li>
                  <li>Send me an email at <a href="mailto:mohamedhabibmarouani8@gmail.com">mohamedhabibmarouani8@gmail.com</a></li>
                </ul>

                <p>I apologize for any inconvenience and look forward to connecting with you soon!</p>

                <p style="margin-top: 30px;">Best regards,<br><strong>Mohamed Habib</strong></p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, result };
  } catch (error) {
    console.error('❌ Error sending rejection email:', error);
    return { success: false, error };
  }
}

