import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WebGLBackground from '@/components/canvas/WebGLBackground'
import CometCursor from '@/components/canvas/CometCursor'

export const metadata: Metadata = {
  title: 'Deepkumar Ilasariya | AEM Expert & Astronomer',
  description:
    'Portfolio of Deepkumar Ilasariya — Lead Web Content Specialist, Adobe Certified AEM Expert, and passionate astronomer. Over 2.7 years orchestrating digital content ecosystems by day and exploring deep space by night.',
  keywords: [
    'AEM',
    'Adobe Experience Manager',
    'Content Management',
    'Portfolio',
    'Astronomer',
    'Web Content Specialist',
    'Deepkumar Ilasariya',
  ],
  authors: [{ name: 'Deepkumar Ilasariya', url: 'https://www.instagram.com/galactic.shots/' }],
  openGraph: {
    title: 'Deepkumar Ilasariya | AEM Expert & Astronomer',
    description:
      'Lead Web Content Specialist and Adobe Certified AEM Expert. Explore my portfolio of digital transformations for global industry leaders.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepkumar Ilasariya | AEM Expert & Astronomer',
    description:
      'Lead Web Content Specialist and Adobe Certified AEM Expert. Exploring the cosmos one exposure at a time.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body-md text-body-md bg-transparent text-on-background antialiased overflow-x-hidden" suppressHydrationWarning>
        {/* WebGL starfield background canvas — mounted once globally */}
        <WebGLBackground />

        {/* Green comet cursor overlay */}
        <CometCursor />

        {/* Sticky navigation */}
        <Navbar />

        {/* Page content */}
        <main className="relative z-10">{children}</main>

        {/* Site footer */}
        <Footer />
      </body>
    </html>
  )
}
