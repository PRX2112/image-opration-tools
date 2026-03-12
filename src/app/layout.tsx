import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from '@next/third-parties/google';
import InteractiveDotsBackground from "@/components/ui/InteractiveDotsBackground";
import { ENABLE_INTERACTIVE_BACKGROUND } from "@/config/ui";
import AdBanner from "@/components/AdBanner";

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
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
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
        <ThemeProvider>
          <Header />
          {ENABLE_INTERACTIVE_BACKGROUND && <InteractiveDotsBackground />}
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          
          {/* Global Footer Ad Unit */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full border-t border-gray-100 dark:border-gray-800/50 mt-12 bg-gray-50/50 dark:bg-gray-900/20">
            <div className="text-center text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Advertisement</div>
            <AdBanner dataAdSlot="INSERT_YOUR_SLOT_ID_HERE" dataAdFormat="horizontal" />
          </div>

          <Footer />
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
