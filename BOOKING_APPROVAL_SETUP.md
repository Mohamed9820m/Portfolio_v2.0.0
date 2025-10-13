# Booking Approval System Setup

## Overview

Your booking system now requires **admin approval** before meetings are confirmed. Here's how it works:

### 📋 Workflow

1. **User Books a Meeting**
   - User fills out the calendar booking form
   - Booking is saved as "pending" (not confirmed yet)
   - User sees: "Request Submitted! Your booking request has been sent for approval."

2. **Admin Receives Approval Email**
   - You (mohamedhabibmarouani8@gmail.com) receive an email with:
     - Guest name and email
     - Requested date and time
     - Meeting notes (if any)
     - Two buttons: **✅ Approve & Create Meeting** and **❌ Reject Request**

3. **Admin Takes Action**
   
   **If you APPROVE:**
   - Google Calendar event is created automatically
   - Google Meet link is generated
   - User receives confirmation email with the Google Meet link
   - Event is added to your Google Calendar
   
   **If you REJECT:**
   - User receives a polite rejection email
   - No calendar event is created
   - User can choose a different time or contact you directly

### 🗂️ Data Storage

Pending bookings are stored in: `data/bookings.json`

This file is automatically created and managed by the system. It stores:
- Booking ID
- Guest information
- Requested date/time
- Status (pending/approved/rejected)
- Timestamps

**Note:** This file is gitignored and won't be committed to your repository.

### 🔗 API Endpoints

1. **`POST /api/bookings`**
   - Creates a pending booking
   - Sends approval email to admin

2. **`GET /api/bookings/confirm?id=BOOKING_ID&action=approve`**
   - Approves booking, creates calendar event, sends confirmation to user
   - This URL is in your approval email button

3. **`GET /api/bookings/confirm?id=BOOKING_ID&action=reject`**
   - Rejects booking, sends rejection email to user
   - This URL is in your rejection email button

### 🚀 Testing the System

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `/contact` page

3. Book a meeting with test data

4. Check your email (mohamedhabibmarouani8@gmail.com) for the approval request

5. Click either "Approve" or "Reject" button

6. Verify the appropriate emails are sent and calendar events are created (if approved)

### ⚙️ Environment Variables Required

Make sure these are in your `.env.local`:

```env
# Google Calendar API
GOOGLE_REFRESH_TOKEN=your_refresh_token

# Resend Email API
RESEND_API_KEY=your_resend_api_key

# Base URL (for approval links)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, update `NEXT_PUBLIC_BASE_URL` to your actual domain.

### 📧 Email Templates

Three email templates are used:

1. **Admin Approval Request** - Orange theme with approve/reject buttons
2. **User Confirmation** - Purple theme with Google Meet link (sent after approval)
3. **User Rejection** - Gray theme with alternative options (sent after rejection)

### 🎨 User Experience

**Before approval:**
- User sees amber clock icon
- Message: "Request Submitted!"
- Explanation that they'll receive confirmation once approved

**After approval:**
- User receives email with Google Meet link
- Can add to their calendar
- Reminder emails are automatically sent by Google Calendar

### 🔒 Security

- Booking IDs are randomly generated (32 hex characters)
- No authentication needed for approval links (they're one-time use)
- Once processed, bookings can't be re-approved/rejected
- All emails use Resend's verified sender for testing (`onboarding@resend.dev`)

### 📝 Future Improvements

If you want to enhance this system, you could:
- Add a dashboard to view all pending/approved/rejected bookings
- Add calendar integration to block off unavailable times
- Add SMS notifications via Twilio
- Store bookings in a real database (PostgreSQL, MongoDB)
- Add authentication for the admin approval page
- Add ability to suggest alternative times when rejecting

---

**Need Help?** Check the console logs when testing. The system logs each step clearly with emojis for easy debugging! 🐛

