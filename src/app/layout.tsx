import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WebGLBackground from '@/components/canvas/WebGLBackground'
import CometCursor from '@/components/canvas/CometCursor'

export const metadata: Metadata = {
  title: 'Deep Ilasariya | AEM Solutions Consultant | Adobe Certified Expert',
  description:
    'Deep Ilasariya is an Adobe Certified AEM Solutions Consultant with 3+ years delivering enterprise CMS operations for HDFC Bank, Tata AIA, Medtronic, QuidelOrtho, and Oona Insurance. Specialized in AEM Cloud, Edge Delivery Services, multilingual content, and workflow automation.',
  keywords: [
    'AEM Consultant',
    'Adobe Experience Manager',
    'AEM Cloud Service',
    'Edge Delivery Services',
    'AEM Content Operations',
    'Content Fragment Modeling',
    'Enterprise CMS',
    'Multilingual AEM',
    'Live Copy Blueprint',
    'AEM Workflow Automation',
    'Adobe Certified Expert',
    'Deep Ilasariya',
    'AEM Freelancer',
    'Remote AEM Consultant',
    'AEM Sites Business Practitioner',
    'Dynamic Media',
    'Dispatcher Configuration',
    'ACS Commons',
    'Experience Fragments',
    'Headless CMS',
  ],
  authors: [{ name: 'Deep Ilasariya' }],
  openGraph: {
    title: 'Deep Ilasariya | AEM Solutions Consultant | Adobe Certified Expert',
    description:
      'Enterprise AEM Consultant delivering content operations, workflow automation, and multilingual CMS rollouts for global brands. Adobe Certified Expert. Available for collaborations.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.deepilasariya.com/',
    images: [
      {
        url: 'https://www.deepilasariya.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Deep Ilasariya | AEM Solutions Consultant Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Ilasariya | AEM Solutions Consultant',
    description:
      'Adobe Certified AEM Expert. 3+ years delivering enterprise CMS operations for HDFC Bank, Tata AIA, Medtronic and more. Available for collaborations.',
    images: ['https://www.deepilasariya.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/favicon.svg',
    shortcut: '/images/favicon.svg',
    apple: '/images/favicon.svg',
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
        {/* Load Google Fonts via <link> — NOT @import in CSS, which Next.js PostCSS breaks */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai, Maharashtra, India" />
        <link rel="canonical" href="https://www.deepilasariya.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Deep Ilasariya",
              "jobTitle": "AEM Solutions Consultant",
              "description": "Adobe Certified AEM Sites Business Practitioner with 3+ years delivering enterprise CMS solutions for global brands. Specialized in AEM Cloud, Edge Delivery Services, multilingual content operations, and workflow automation.",
              "url": "https://www.deepilasariya.com/",
              "email": "ilasariyadeep13@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "knowsAbout": [
                "Adobe Experience Manager",
                "AEM Cloud Service",
                "Edge Delivery Services",
                "Content Fragment Modeling",
                "Experience Fragments",
                "Dynamic Media",
                "Multilingual Content Management",
                "AEM Workflow Automation",
                "Enterprise CMS Operations",
                "Dispatcher Configuration"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "Adobe Certified Expert | AEM Sites Business Practitioner",
                "credentialCategory": "Professional Certification",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Adobe"
                }
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Independent Consultant"
              },
              "sameAs": [
                "https://www.linkedin.com/in/ilasariyadeep13/",
                "https://www.instagram.com/galactic.shots/"
              ]
            })
          }}
        />
        {/* ProfessionalService schema — enables Local SEO, geo signals, and rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Deep Ilasariya - AEM Solutions Consultant",
              "image": "https://www.deepilasariya.com/images/deep-ilasariya.webp",
              "url": "https://www.deepilasariya.com/",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "19.1828",
                "longitude": "72.8592"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://github.com/ilasariyadeep"
              ],
              "jobTitle": "AEM Solutions Consultant",
              "knowsAbout": [
                "Adobe Experience Manager",
                "AEM Sites",
                "Edge Delivery Services",
                "Content Operations",
                "Workflow Automation",
                "Multilingual Rollouts"
              ]
            })
          }}
        />
      </head>
      <body className="font-body-md text-body-md bg-transparent text-on-background antialiased overflow-x-hidden" suppressHydrationWarning>
        {/* WebGL starfield background canvas | mounted once globally */}
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
