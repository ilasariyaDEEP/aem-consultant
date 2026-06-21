import React from 'react'
import Link from 'next/link'

const SOCIAL_LINKS: Array<{ label: string; href: string }> = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/deepkumar-ilasariya/' },
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/galactic.shots/' },
  { label: 'Email', href: 'mailto:ilasariyadeep13@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="bg-void-black/40 border-t border-outline-variant/10 py-12 transition-all duration-300 relative z-10 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto w-full gap-8">
        {/* Brand */}
        <div className="font-label-caps text-label-caps text-cosmic-teal">
          Deepkumar Ilasariya
        </div>

        {/* Copyright */}
        <div className="font-body-md text-body-md text-tertiary text-center md:text-left">
          © 2024 Deepkumar Ilasariya • Astronomy Enthusiast &amp; AEM Expert
        </div>

        {/* Socials */}
        <div className="flex gap-6 font-body-md text-body-md">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="text-secondary hover:text-primary transition-colors hover:scale-105 inline-block"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
