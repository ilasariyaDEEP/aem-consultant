'use client'

import React from 'react'
import Link from 'next/link'
import { useEffect, useCallback } from 'react'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const NAV_LINKS: Array<{ label: string; href: string; sectionId: string }> = [
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Astronomy', href: '#astronomy', sectionId: 'astronomy' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'astronomy', 'contact']

export default function Navbar() {
  const { activeSection, isMobileMenuOpen, setActiveSection, toggleMobileMenu, closeMobileMenu } =
    usePortfolioStore()

  // IntersectionObserver to track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setActiveSection])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      closeMobileMenu()
    },
    [closeMobileMenu]
  )

  const handleConnectClick = useCallback((): void => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    closeMobileMenu()
  }, [closeMobileMenu])

  return (
    <header className="sticky top-0 z-50 bg-deep-navy/40 backdrop-blur-md border-b border-nebula-purple/20 shadow-[0_0_15px_rgba(76,29,149,0.1)] transition-all duration-300 ease-in-out">
      <nav className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto w-full">
        {/* Brand */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-headline-md text-headline-md text-starlight-white tracking-tighter hover:text-primary transition-colors"
        >
          Deepkumar I.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-label-caps text-label-caps">
          {NAV_LINKS.map(({ label, href, sectionId }) => (
            <a
              key={sectionId}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`relative transition-colors ${
                activeSection === sectionId
                  ? 'text-primary font-bold after:content-[""] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full'
                  : 'text-secondary-fixed-dim hover:text-starlight-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={handleConnectClick}
          className="hidden md:block bg-primary text-on-primary font-label-caps px-6 py-2 rounded-full hover:bg-nebula-purple hover:text-starlight-white transition-all duration-300 shadow-[0_0_10px_rgba(211,187,255,0.3)]"
        >
          Connect
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden text-starlight-white hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-0 border-t border-nebula-purple/20 px-gutter py-6 flex flex-col gap-6">
          {NAV_LINKS.map(({ label, href, sectionId }) => (
            <a
              key={sectionId}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`font-label-caps text-label-caps transition-colors ${
                activeSection === sectionId
                  ? 'text-primary'
                  : 'text-secondary-fixed-dim hover:text-starlight-white'
              }`}
            >
              {label}
            </a>
          ))}
          <button
            onClick={handleConnectClick}
            className="bg-primary text-on-primary font-label-caps px-6 py-3 rounded-full hover:bg-nebula-purple hover:text-starlight-white transition-all duration-300 text-left"
          >
            Connect
          </button>
        </div>
      )}
    </header>
  )
}
