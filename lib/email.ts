import nodemailer from 'nodemailer';

// Create transporter using Gmail (you can change this to any email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Debug: Check if email credentials are loaded
console.log('📧 Email credentials loaded:', {
  user: process.env.EMAIL_USER ? 'YES' : 'NO',
  pass: process.env.EMAIL_PASSWORD ? 'YES' : 'NO',
});

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
    const info = await transporter.sendMail({
      from: `"Mohamed Habib" <${process.env.EMAIL_USER}>`,
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
                padding: 10px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .label {
                font-weight: 600;
                color: #667eea;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
              }
              .button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 14px 28px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">✅ Meeting Confirmed!</h1>
                <p class="subtitle">Your meeting has been scheduled successfully</p>
              </div>
              
              <div class="content">
                <p>Hi ${data.name},</p>
                <p>Great news! Your meeting has been confirmed. Here are the details:</p>
                
                <div class="info-box">
                  <div class="info-row">
                    <div class="label">📅 Date</div>
                    <div class="value">${formattedDate}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">🕐 Time</div>
                    <div class="value">${data.time} ${data.timezone ? `(${data.timezone})` : ''}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">📝 Meeting</div>
                    <div class="value">${data.meetingTitle || '30 Min Meeting'}</div>
                  </div>
                  ${data.meetLink ? `
                  <div class="info-row">
                    <div class="label">🔗 Meeting Link</div>
                    <div class="value"><a href="${data.meetLink}" style="color: #667eea;">${data.meetLink}</a></div>
                  </div>
                  ` : ''}
                  ${data.notes ? `
                  <div class="info-row">
                    <div class="label">📌 Notes</div>
                    <div class="value">${data.notes}</div>
                  </div>
                  ` : ''}
                </div>

                ${data.meetLink ? `
                <div style="text-align: center;">
                  <a href="${data.meetLink}" class="button">Join Meeting</a>
                </div>
                ` : ''}

                <p>Looking forward to speaking with you!</p>
                
                <div class="footer">
                  <p>Best regards,<br><strong>Mohamed Habib</strong></p>
                  <p style="font-size: 12px; color: #999;">
                    If you need to reschedule, please reply to this email.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ User confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending user confirmation email:', error);
    return { success: false, error };
  }
}

// Email to ADMIN for approval
export async function sendAdminApprovalEmail(data: PendingBookingEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'mohamedhabibmarouani8@gmail.com';
  
  console.log('📧 Sending admin approval request email to:', adminEmail);
  console.log('📋 Booking ID:', data.bookingId);
  
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://portfolio-v2-0-0.vercel.app';
  
  const approveUrl = `${baseUrl}/api/bookings/confirm?id=${data.bookingId}&action=approve`;
  const rejectUrl = `${baseUrl}/api/bookings/confirm?id=${data.bookingId}&action=reject`;

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Booking System" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `🔔 New Meeting Request - ${data.name}`,
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
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                overflow: hidden;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 30px;
              }
              .info-box {
                background: #f7f7f7;
                border-left: 4px solid #667eea;
                border-radius: 4px;
                padding: 20px;
                margin: 20px 0;
              }
              .info-row {
                padding: 8px 0;
              }
              .label {
                font-weight: 600;
                color: #667eea;
                display: inline-block;
                width: 120px;
              }
              .value {
                color: #333;
              }
              .actions {
                text-align: center;
                margin: 30px 0;
                padding: 20px 0;
              }
              .button {
                display: inline-block;
                padding: 14px 28px;
                margin: 0 10px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                font-size: 16px;
              }
              .approve {
                background: #10b981;
                color: white;
              }
              .reject {
                background: #ef4444;
                color: white;
              }
              .footer {
                text-align: center;
                padding: 20px;
                background: #f7f7f7;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔔 New Meeting Request</h1>
              </div>
              
              <div class="content">
                <p><strong>You have a new meeting booking request!</strong></p>
                
                <div class="info-box">
                  <div class="info-row">
                    <span class="label">👤 Name:</span>
                    <span class="value">${data.name}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">📧 Email:</span>
                    <span class="value">${data.email}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">📅 Date:</span>
                    <span class="value">${formattedDate}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">🕐 User Time:</span>
                    <span class="value">${data.time} ${data.timezone ? `(${data.timezone})` : ''}</span>
                  </div>
                  ${data.berlinDate && data.berlinTime ? `
                  <div class="info-row">
                    <span class="label">🕐 Berlin Time:</span>
                    <span class="value">${data.berlinTime} on ${data.berlinDate}</span>
                  </div>
                  ` : ''}
                  <div class="info-row">
                    <span class="label">📝 Meeting:</span>
                    <span class="value">${data.meetingTitle || '30 Min Meeting'}</span>
                  </div>
                  ${data.notes ? `
                  <div class="info-row">
                    <span class="label">📌 Notes:</span>
                    <span class="value">${data.notes}</span>
                  </div>
                  ` : ''}
                </div>

                <div class="actions">
                  <a href="${approveUrl}" class="button approve">✅ Approve Meeting</a>
                  <a href="${rejectUrl}" class="button reject">❌ Reject Meeting</a>
                </div>

                <p style="text-align: center; color: #666; font-size: 14px;">
                  Click one of the buttons above to approve or reject this booking.
                </p>
              </div>
              
              <div class="footer">
                <p>Portfolio Booking System</p>
                <p style="font-size: 12px; color: #999;">
                  This is an automated notification from your portfolio website.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Admin approval email sent successfully');
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending admin approval email:', error);
    return { success: false, error };
  }
}

// Email to USER after admin rejects
export async function sendUserRejectionEmail(data: BookingEmailData) {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  try {
    const info = await transporter.sendMail({
      from: `"Mohamed Habib" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: 'Meeting Request Update',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
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
                background: white;
                border-radius: 12px;
                padding: 30px;
                border: 2px solid #f0f0f0;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                color: #ef4444;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📅 Meeting Request Update</h1>
              </div>
              
              <p>Hi ${data.name},</p>
              <p>Thank you for your interest in scheduling a meeting. Unfortunately, the requested time slot for <strong>${formattedDate} at ${data.time}</strong> is not available.</p>
              <p>Please visit my portfolio to select an alternative time that works better.</p>
              <p>I apologize for any inconvenience and look forward to connecting with you soon!</p>
              
              <p>Best regards,<br><strong>Mohamed Habib</strong></p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending rejection email:', error);
    return { success: false, error };
  }
}

// Contact form email
export async function sendContactFormEmail(data: { name: string; email: string; message: string }) {
  const adminEmail = process.env.ADMIN_EMAIL || 'mohamedhabibmarouani8@gmail.com';

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: `💬 New Contact Form Submission - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
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
                background: white;
                border-radius: 12px;
                padding: 30px;
                border: 2px solid #667eea;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .info-box {
                background: #f7f7f7;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .label {
                font-weight: 600;
                color: #667eea;
                margin-bottom: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">💬 New Contact Form Message</h2>
              </div>
              
              <div class="info-box">
                <div class="label">From:</div>
                <p><strong>${data.name}</strong> (${data.email})</p>
                
                <div class="label">Message:</div>
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p style="text-align: center; color: #666; font-size: 14px;">
                Reply directly to this email to respond to ${data.name}
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    return { success: false, error };
  }
}
