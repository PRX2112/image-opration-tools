import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from '@next/third-parties/google';
import InteractiveDotsBackground from "@/components/ui/InteractiveDotsBackground";
import { ENABLE_INTERACTIVE_BACKGROUND } from "@/config/ui";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://resizeme.in'),
  title: {
    default: "ResizeMe - Free Online Image Tools",
    template: "%s | ResizeMe"
  },
  description: "Professional image tools for resizing, cropping, compressing, and converting. Fast, secure, and privacy-focused. All processing happens in your browser/server.",
  keywords: ["image resizer", "photo editor", "online image tools", "compress image", "crop image", "convert image format", "free online tools"],
  authors: [{ name: "ResizeMe Team" }],
  creator: "ResizeMe",
  publisher: "ResizeMe",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resizeme.in',
    siteName: 'ResizeMe',
    title: 'ResizeMe - All-in-One Image Toolkit',
    description: 'Resize, crop, compress, and convert images instantly. Free, secure, and high-quality.',
    images: [
      {
        url: '/og-image.jpg', // We need to create this later
        width: 1200,
        height: 630,
        alt: 'ResizeMe Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResizeMe - All-in-One Image Toolkit',
    description: 'Resize, crop, compress, and convert images instantly.',
    creator: '@resizeme',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: "google-site-verification=VerificationCodeHere", // Replace with your actual code
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ResizeMe",
              url: "https://resizeme.in",
              logo: "https://resizeme.in/logo.png",
            }),
          }}
        />
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && process.env.NEXT_PUBLIC_ADS_ENABLED === 'true' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider>
            <Header />
            {ENABLE_INTERACTIVE_BACKGROUND && <InteractiveDotsBackground />}
            <main className="min-h-screen relative z-10">
              {children}
            </main>
            <Footer />
            {/* <ChatWidget /> */}
          </ThemeProvider>
        </SessionProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
