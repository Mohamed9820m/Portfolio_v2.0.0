import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Mohamed Habib - Full-Stack Developer & UI/UX Designer",
    template: "%s | Mohamed Habib Portfolio"
  },
  description: "Proactive full-stack developer passionate about creating dynamic web experiences. Expertise in React, Next.js, Node.js, TypeScript, and modern web technologies. Available for freelance projects and consultations.",
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "Mohamed Habib",
    "Freelance Developer",
    "Web Design",
    "Modern Web Development",
    "Responsive Design",
    "JavaScript Expert",
    "Photography",
    "Professional Developer"
  ],
  authors: [{ name: "Mohamed Habib" }],
  creator: "Mohamed Habib",
  publisher: "Mohamed Habib",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://portfolio-v2-0-0.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-v2-0-0.vercel.app',
    title: 'Mohamed Habib - Full-Stack Developer & UI/UX Designer',
    description: 'Proactive full-stack developer passionate about creating dynamic web experiences. Expertise in React, Next.js, Node.js, and modern web technologies.',
    siteName: 'Mohamed Habib Portfolio',
    images: [
      {
        url: 'https://portfolio-v2-0-0.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohamed Habib - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Habib - Full-Stack Developer',
    description: 'Proactive full-stack developer passionate about creating dynamic web experiences.',
    images: ['https://portfolio-v2-0-0.vercel.app/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Mobile Optimization - Critical */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        
        {/* Performance Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.app" />
        
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohamed Habib",
              "url": "https://portfolio-v2-0-0.vercel.app",
              "image": "https://portfolio-v2-0-0.vercel.app/linkedin.png",
              "sameAs": [
                "https://github.com/Mohamed9820m",
                "https://www.linkedin.com/in/mohamed-habiiib",
              ],
              "jobTitle": "Full-Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "description": "Proactive full-stack developer passionate about creating dynamic web experiences",
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Web Development",
                "UI/UX Design"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
