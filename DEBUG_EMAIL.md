# 🐛 Email Debugging Guide

## Changes Made:

1. ✅ Added detailed console logging for admin email
2. ✅ Changed email sender to `onboarding@resend.dev` (Resend default)
3. ✅ Added error details logging
4. ✅ Changed from parallel to sequential email sending for better debugging

## How to Debug:

### Step 1: Restart Your Server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 2: Test Booking
1. Go to `http://localhost:3000/contact`
2. Click "Book a call"
3. Select a date and time
4. Fill in details:
   - Name: Test User
   - Email: YOUR_EMAIL@gmail.com (use your real email!)
   - Notes: Testing admin email
5. Click "Schedule Meeting"

### Step 3: Check Console Logs

Look for these messages in your terminal:

```
📧 Sending user confirmation email...
✅ User email result: { ... }

📧 Sending admin notification email to mohamedhabibmarouani8@gmail.com...
🔍 Attempting to send admin email with data: { ... }
✅ Admin notification email sent successfully
📧 Email result: { ... }
```

### Step 4: Check Resend Dashboard

1. Go to [resend.com](https://resend.com/emails)
2. Log in
3. Go to "Emails" in the sidebar
4. You should see BOTH emails:
   - One to the user
   - One to `mohamedhabibmarouani8@gmail.com`

## Common Issues:

### Issue 1: "RESEND_API_KEY not found"
**Solution:** Make sure `.env.local` has:
```
RESEND_API_KEY=re_your_key_here
```

### Issue 2: "Email address not verified"
**Solution:** With `onboarding@resend.dev`, Resend will only send emails to:
- The email you signed up with
- Any email you verify

**To receive at mohamedhabibmarouani8@gmail.com:**
1. In Resend dashboard, go to "Settings" → "Email Addresses"
2. Add `mohamedhabibmarouani8@gmail.com`
3. Click the verification link sent to that email
4. Try booking again

### Issue 3: Both emails show as sent but only user receives
This usually means:
- Emails are being sent successfully
- Gmail might be filtering the admin email
- Check your **Spam folder** in `mohamedhabibmarouani8@gmail.com`
- Check **Promotions** or **Updates** tabs in Gmail

### Issue 4: Error in console
If you see an error, copy it and we can fix it!

## Quick Test Without Booking:

You can also test emails directly. Create a test file:

```typescript
// test-email.ts
import { sendAdminNotificationEmail } from './lib/email';

async function test() {
  const result = await sendAdminNotificationEmail({
    name: 'Test User',
    email: 'test@example.com',
    date: '2025-10-13',
    time: '9:00am',
    duration: '30m',
    meetLink: 'https://meet.google.com/xxx-xxxx-xxx',
    meetingTitle: '30 Min Meeting',
    notes: 'Testing admin email'
  });
  
  console.log('Result:', result);
}

test();
```

Run:
```bash
npx tsx test-email.ts
```

## Expected Behavior:

When everything works correctly:
1. ✅ User receives confirmation email
2. ✅ You (`mohamedhabibmarouani8@gmail.com`) receive notification email
3. ✅ Both emails show in Resend dashboard
4. ✅ Google Calendar event is created
5. ✅ Everyone has the Meet link

## Next Steps:

1. Restart server
2. Test booking
3. Check terminal logs
4. Check Resend dashboard
5. Check both inboxes (including spam)
6. Share console output if there's an issue

