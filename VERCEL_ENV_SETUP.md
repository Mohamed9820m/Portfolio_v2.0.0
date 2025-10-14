# Vercel Environment Variables Setup

## 🚀 Important: Set These in Vercel Dashboard

Go to your Vercel project settings → Environment Variables and add these:

### 1. **Base URL (CRITICAL for booking confirmation links)**
```
NEXT_PUBLIC_BASE_URL=https://portfolio-v2-0-0.vercel.app
```

### 2. **Google OAuth & Calendar API**
```
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here
GOOGLE_CALENDAR_ID=mohamedhabibmarouani8@gmail.com
```

### 3. **Azure SQL Database**
```
DB_SERVER=tcp:portfolio12.database.windows.net,1433
DB_DATABASE=porto
DB_USER=root44
DB_PASSWORD=admin9820@
```

### 4. **Email Configuration (Gmail with App Password)**
```
EMAIL_USER=mohamedhabibmarouani8@gmail.com
EMAIL_PASSWORD=minbgmxkedeoaqcr
ADMIN_EMAIL=mohamedhabibmarouani8@gmail.com
```

## 📋 How to Add in Vercel:

1. Go to: https://vercel.com/your-username/portfolio-v2-0-0/settings/environment-variables
2. For each variable:
   - Enter the **Name** (e.g., `NEXT_PUBLIC_BASE_URL`)
   - Enter the **Value** (e.g., `https://portfolio-v2-0-0.vercel.app`)
   - Select environments: **Production**, **Preview**, **Development**
   - Click **Save**

## 🔄 After Adding Variables:

Redeploy your application:
```bash
git push origin master
```

Or trigger a manual redeploy in Vercel dashboard.

## ✅ Verification:

After deployment, the booking confirmation emails will use:
- ✅ `https://portfolio-v2-0-0.vercel.app/api/bookings/confirm?id=...&action=approve`
- Instead of ❌ `http://localhost:3000/api/bookings/confirm?id=...&action=approve`

## 🔧 Fallback Logic:

The code now uses this priority:
1. `NEXT_PUBLIC_BASE_URL` (if set in Vercel)
2. `VERCEL_URL` (automatically provided by Vercel)
3. Hardcoded: `https://portfolio-v2-0-0.vercel.app` (as final fallback)

This ensures your booking confirmation links always work in production! 🎉

