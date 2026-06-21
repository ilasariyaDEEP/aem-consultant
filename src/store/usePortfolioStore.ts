import { create } from 'zustand'

type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface PortfolioStore {
  /** Currently visible section id, used for nav active state via IntersectionObserver */
  activeSection: string
  /** Mobile nav drawer open state */
  isMobileMenuOpen: boolean
  /** Contact form submission status */
  contactFormStatus: ContactFormStatus
  /** Whether any section animation should be paused (e.g. when offscreen) */
  hasReducedMotion: boolean

  // Actions
  setActiveSection: (id: string) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setContactFormStatus: (status: ContactFormStatus) => void
  setHasReducedMotion: (val: boolean) => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activeSection: 'home',
  isMobileMenuOpen: false,
  contactFormStatus: 'idle',
  hasReducedMotion: false,

  setActiveSection: (id: string) =>
    set({ activeSection: id }),

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  closeMobileMenu: () =>
    set({ isMobileMenuOpen: false }),

  setContactFormStatus: (status: ContactFormStatus) =>
    set({ contactFormStatus: status }),

  setHasReducedMotion: (val: boolean) =>
    set({ hasReducedMotion: val }),
}))
