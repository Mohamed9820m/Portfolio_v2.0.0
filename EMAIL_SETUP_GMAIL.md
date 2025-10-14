# Gmail Setup for Nodemailer

## Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google," click on **2-Step Verification**
4. Follow the prompts to enable 2FA if not already enabled

## Step 2: Generate App Password

1. Go to https://myaccount.google.com/apppasswords
   - Or navigate: Google Account → Security → 2-Step Verification → App passwords
2. In the "Select app" dropdown, choose **Mail**
3. In the "Select device" dropdown, choose **Other (Custom name)**
4. Enter a name like "Portfolio Website" or "Nodemailer"
5. Click **Generate**
6. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

## Step 3: Update Environment Variables

Update your `.env.local` file (or `.env`, `.env.production`, etc.):

```env
EMAIL_USER=mohamedhabibmarouani8@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx  # Paste the 16-character App Password here
ADMIN_EMAIL=mohamedhabibmarouani8@gmail.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Change to your production URL when deploying
```

## Step 4: Restart the Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 5: Test the Email

Try making a booking or sending a contact form message to test if emails are working.

## Important Notes:

⚠️ **Security:**
- Never commit the App Password to Git
- The App Password is different from your regular Gmail password
- If compromised, revoke the App Password and generate a new one

✅ **Benefits of App Passwords:**
- More secure than using your regular password
- Can be revoked individually without changing your main password
- Works with Nodemailer and other third-party apps

## Troubleshooting:

**"Invalid login"** error:
- Make sure 2FA is enabled
- Verify you're using the App Password, not your regular password
- Remove any spaces from the App Password

**Emails not sending:**
- Check the console for error messages
- Verify EMAIL_USER and EMAIL_PASSWORD are set correctly
- Make sure the server is restarted after updating .env files

## Alternative: Use a Different Email Service

If you don't want to use Gmail, you can use other services:

### SendGrid (Free tier: 100 emails/day)
```js
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

### Outlook/Hotmail
```js
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Yahoo
```js
const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

