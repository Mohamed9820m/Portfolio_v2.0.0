# Portfolio Setup Guide

## Prerequisites

- Node.js 18+ installed
- Azure SQL Database account
- Google Cloud Platform account (for Google Calendar API)
- Resend account (for email notifications)

## Environment Variables Setup

1. Copy the template file:
```bash
cp env.local.template .env.local
```

2. Fill in your actual credentials in `.env.local`:

### Google OAuth Credentials
- Create a project in [Google Cloud Console](https://console.cloud.google.com/)
- Enable Google Calendar API
- Create OAuth 2.0 credentials
- Add your Client ID and Client Secret to `.env.local`

### Google Refresh Token
- Run the auth setup page: `http://localhost:3000/auth-setup`
- Follow the OAuth flow to get your refresh token
- Add the refresh token to `.env.local`

### Azure SQL Database
- Create an Azure SQL Database
- Get your connection details (server, database name, user, password)
- Add them to `.env.local`

### Resend Email API
- Sign up at [Resend](https://resend.com/)
- Get your API key
- Add it to `.env.local`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npm run db:migrate
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel Deployment

1. Push your code to GitHub (make sure `.env.local` is NOT committed)
2. Import your project in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

## Important Security Notes

⚠️ **NEVER** commit the following files:
- `.env.local`
- Any file containing API keys, secrets, or tokens
- Database passwords

✅ **ALWAYS**:
- Use environment variables for sensitive data
- Keep `.env.local.template` as a reference (without real values)
- Add sensitive files to `.gitignore`

## Support

For issues, please check the documentation or create an issue in the repository.

