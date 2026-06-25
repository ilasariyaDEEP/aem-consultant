'use client'

import React from 'react'
import Link from 'next/link'
import { useEffect, useCallback, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const NAV_LINKS: Array<{ label: string; href: string; sectionId: string }> = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Projects', href: '#projects', sectionId: 'projects' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'contact']

export default function Navbar() {
  const { activeSection, isMobileMenuOpen, setActiveSection, toggleMobileMenu, closeMobileMenu } =
    usePortfolioStore()

  /**
   * isScrollingRef — set to true when a nav link is clicked.
   * While true, the IntersectionObserver is silenced so sections
   * the viewport passes through mid-scroll can't steal the active state.
   * Auto-releases after 1100 ms (well past the ~600-800 ms smooth-scroll).
   */
  const isScrollingRef = useRef(false)
  const scrollLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lockScroll = useCallback(() => {
    isScrollingRef.current = true
    if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current)
    scrollLockTimer.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 1100)
  }, [])

  // IntersectionObserver to track which section is in view and sync URL hash
  useEffect(() => {
    // Map to track intersecting entries so we can find the one closest to the top
    const intersectingMap = new Map<string, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore observer events while a programmatic scroll is in progress
        if (isScrollingRef.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingMap.set(entry.target.id, entry)
          } else {
            intersectingMap.delete(entry.target.id)
          }
        })

        if (intersectingMap.size === 0) return

        // Pick the intersecting section closest to the top of the viewport
        let bestId = ''
        let minDistance = Infinity
        intersectingMap.forEach((entry, id) => {
          const distance = Math.abs(entry.boundingClientRect.top)
          if (distance < minDistance) {
            minDistance = distance
            bestId = id
          }
        })

        if (bestId) {
          setActiveSection(bestId)
          // Update URL hash without scrolling or adding a history entry
          if (window.location.hash !== `#${bestId}`) {
            history.replaceState(null, '', `#${bestId}`)
          }
        }
      },
      {
        threshold: 0,
        rootMargin: '-20% 0px -50% 0px',
      }
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
        // Lock observer BEFORE scrolling so mid-scroll sections are ignored
        lockScroll()
        setActiveSection(targetId)
        history.pushState(null, '', href)
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      closeMobileMenu()
    },
    [closeMobileMenu, setActiveSection, lockScroll]
  )

  const handleConnectClick = useCallback((): void => {
    const el = document.getElementById('contact')
    if (el) {
      lockScroll()
      setActiveSection('contact')
      history.pushState(null, '', '#contact')
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    closeMobileMenu()
  }, [closeMobileMenu, setActiveSection, lockScroll])

  return (
    <header className="sticky top-0 z-50 bg-deep-navy/40 backdrop-blur-md border-b border-nebula-purple/20 shadow-[0_0_15px_rgba(76,29,149,0.1)] transition-all duration-300 ease-in-out">
      <nav className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto w-full">
        {/* Brand */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-headline-md text-headline-md text-starlight-white tracking-tighter hover:text-primary transition-colors"
        >
          Deep Ilasariya
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
                  ? 'text-primary font-bold'
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
          <span className="text-2xl flex items-center justify-center">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full hover:bg-nebula-purple hover:text-starlight-white transition-all duration-300 w-fit self-start"
          >
            Connect
          </button>
        </div>
      )}
    </header>
  )
}
