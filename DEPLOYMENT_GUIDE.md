# 🚀 Deployment & Optimization Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy
```bash
# Push to GitHub first
git add .
git commit -m "Production ready"
git push origin main

# Then deploy:
# 1. Go to vercel.com
# 2. Import your GitHub repository
# 3. Vercel auto-detects Next.js
# 4. Click Deploy
```

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

---

## Environment Variables Setup

### Required Variables:
```env
# Google Calendar (for bookings)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token

# Email Service (Resend)
RESEND_API_KEY=your-resend-key

# Azure SQL Database
SQL_SERVER=your-server.database.windows.net
SQL_DATABASE=your-database
SQL_USER=your-username
SQL_PASSWORD=your-password

# Base URL (production)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Add to Vercel:
1. Go to Project Settings
2. Environment Variables
3. Add each variable
4. Redeploy

---

## Domain Setup

### 1. **Add Custom Domain in Vercel**
```
1. Go to Project Settings → Domains
2. Add your domain: mohamedhabib.com
3. Add www subdomain: www.mohamedhabib.com
```

### 2. **Update DNS Records**
```
Type  | Name | Value
------|------|------
A     | @    | 76.76.21.21
CNAME | www  | cname.vercel-dns.com
```

### 3. **SSL Certificate**
```
✅ Automatically provided by Vercel
✅ Free Let's Encrypt certificate
✅ Auto-renewal
```

---

## Post-Deployment Checklist

### 1. **Update Configuration**
- [ ] Change `metadataBase` URL in `app/layout.tsx`
- [ ] Update sitemap URLs in `app/sitemap.ts`
- [ ] Update robots.txt URLs in `app/robots.ts`
- [ ] Update structured data URLs

### 2. **Google Search Console**
```bash
# Verify ownership:
1. Go to: search.google.com/search-console
2. Add property: yourdomain.com
3. Verify via DNS or HTML file
4. Submit sitemap: yourdomain.com/sitemap.xml
```

### 3. **Google Analytics**
```typescript
// Add to app/layout.tsx:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### 4. **Social Media Images**
```bash
# Create OG image (1200x630px):
- Add to /public/og-image.jpg
- Shows on social media shares
- LinkedIn, Twitter, Facebook previews
```

---

## Performance Monitoring

### 1. **Real User Monitoring (RUM)**
```typescript
// Vercel Analytics (built-in)
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. **Speed Insights**
```typescript
import { SpeedInsights } from "@vercel/speed-insights/next"

<SpeedInsights />
```

---

## SEO Submission Guide

### 1. **Submit to Search Engines**

#### Google
```
1. Google Search Console: search.google.com/search-console
2. Submit sitemap
3. Request indexing
```

#### Bing
```
1. Bing Webmaster: bing.com/webmasters
2. Import from Google Search Console (easier)
3. Submit sitemap
```

#### Yandex (Optional)
```
1. webmaster.yandex.com
2. Add site
3. Submit sitemap
```

### 2. **Directory Submissions**
```
✅ LinkedIn profile (add website)
✅ GitHub profile (add website)
✅ Dev.to profile
✅ Stack Overflow careers
✅ AngelList/Wellfound
✅ Behance/Dribbble (for design)
```

---

## Ongoing Optimization

### Weekly Tasks:
```
- [ ] Check Google Search Console for errors
- [ ] Monitor site speed (PageSpeed Insights)
- [ ] Check for broken links
- [ ] Review analytics data
```

### Monthly Tasks:
```
- [ ] Update content/projects
- [ ] Create new blog posts
- [ ] Build new backlinks
- [ ] Update photography showcase
- [ ] Review Core Web Vitals
```

---

## Troubleshooting

### Site Not Loading?
```bash
# Check build logs in Vercel
vercel logs [deployment-url]
```

### Environment Variable Issues?
```bash
# Verify all variables are set in Vercel dashboard
# Redeploy after adding variables
```

### Not Indexed by Google?
```bash
# Check robots.txt: yourdomain.com/robots.txt
# Check sitemap: yourdomain.com/sitemap.xml
# Use URL Inspection Tool in Search Console
```

---

## Performance Optimization

### Image Optimization
```typescript
// Always use Next.js Image component:
import Image from 'next/image'

<Image
  src="/photo.jpg"
  width={800}
  height={600}
  alt="Description"
  loading="lazy"
  quality={85}
/>
```

### Font Optimization
```typescript
// Already optimized with Geist fonts
// Using font-display: swap
```

### Code Splitting
```typescript
// Lazy load heavy components:
const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

---

## Security Best Practices

### 1. **Environment Variables**
```bash
# NEVER commit .env files
# Add to .gitignore
.env
.env.local
.env.production
```

### 2. **API Routes**
```typescript
// Add rate limiting to API routes
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const rateLimitResult = await rateLimit(request)
  if (!rateLimitResult.success) {
    return new Response('Too many requests', { status: 429 })
  }
  // ... rest of code
}
```

### 3. **Security Headers**
```typescript
// In next.config.ts:
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ]
}
```

---

## Maintenance Schedule

### Daily:
- Monitor uptime (UptimeRobot)
- Check email notifications (bookings)

### Weekly:
- Review analytics
- Check Search Console
- Update content if needed

### Monthly:
- Run performance audit
- Update dependencies
- Create new content
- Build backlinks

---

## Success Metrics

### After 1 Month:
- ✅ Indexed by Google
- ✅ Appearing in search results
- ✅ 90+ Lighthouse score
- ✅ <2s load time

### After 3 Months:
- ✅ Top 10 for "Your Name"
- ✅ Growing organic traffic
- ✅ Backlinks established
- ✅ Social media presence

### After 6 Months:
- ✅ Top 5 for primary keywords
- ✅ Regular inquiries/bookings
- ✅ Established domain authority
- ✅ Strong SEO foundation

---

## 🎉 You're Ready to Deploy!

Your portfolio is now:
- ✅ Fully optimized for performance
- ✅ SEO-ready for Google ranking
- ✅ Configured for production
- ✅ Ready for custom domain
- ✅ Monitored and maintained

**Deploy with confidence!** 🚀

