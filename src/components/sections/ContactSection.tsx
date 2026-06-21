'use client'

import { useState, useRef, useCallback } from 'react'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import { Radio, Info, Terminal, Loader2, CheckCircle, Send, Share2, AtSign, Globe } from 'lucide-react'
import type { ContactFormData } from '@/types'

const SUBJECT_OPTIONS = [
  'Professional Collaboration',
  'Astronomy Inquiry',
  'Technical Consultation',
  'General Transmission',
] as const

const CONTACT_INFO = [
  {
    id: 'email',
    icon: 'alternate_email',
    iconBg: 'bg-cosmic-teal/10',
    iconColor: 'text-cosmic-teal',
    label: 'Direct Uplink',
    value: 'ilasariyadeep13@gmail.com',
    href: 'mailto:ilasariyadeep13@gmail.com',
    IconComponent: AtSign,
  },
  {
    id: 'location',
    icon: 'public',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    label: 'Orbital Sector',
    value: 'Ahmedabad, IN (IST UTC+5:30)',
    href: null,
    IconComponent: Globe,
  },
] as const

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/deepkumar-ilasariya/' },
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/galactic.shots/' },
] as const

const DEFAULT_FORM: ContactFormData = {
  name: '',
  email: '',
  subject: 'Professional Collaboration',
  message: '',
  highPriority: false,
}

export default function ContactSection() {
  const { contactFormStatus, setContactFormStatus } = usePortfolioStore()
  const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM)

  // Star map state
  const starMapRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ x: string; y: string }>({ x: '00.00', y: '00.00' })
  const [pin, setPin] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  })

  const handleStarMapMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!starMapRef.current) return
      const rect = starMapRef.current.getBoundingClientRect()
      const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2)
      const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2)
      setCoords({ x, y })
    },
    []
  )

  const handleStarMapDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!starMapRef.current) return
      const rect = starMapRef.current.getBoundingClientRect()
      setPin({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
    },
    []
  )

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ): void => {
      const { name, value, type } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      setContactFormStatus('submitting')

      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setContactFormStatus('success')

      // Reset after success display
      setTimeout(() => {
        setContactFormStatus('idle')
        setFormData(DEFAULT_FORM)
        setPin((prev) => ({ ...prev, visible: false }))
      }, 3000)
    },
    [setContactFormStatus]
  )

  const isSubmitting = contactFormStatus === 'submitting'
  const isSuccess = contactFormStatus === 'success'

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
    >
      {/* Nebula gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(76,29,149,0.1), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="px-gutter max-w-container-max mx-auto relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ─── Left Column ─── */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-caps text-label-caps text-primary uppercase">
                  Uplink Active
                </span>
              </div>

              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-starlight-white leading-none text-glow">
                Send a<br />
                <span className="text-primary italic">Signal</span>
              </h1>

              <p className="font-body-lg text-body-lg text-secondary-fixed-dim max-w-md">
                Establishing a secure line across the digital void. Use the terminal below to
                initiate communication or track my current orbital position.
              </p>
            </div>

            {/* System Diagnostics panel */}
            <div className="glass-panel p-6 relative overflow-hidden group rounded-xl">
              <div className="scanner-line" aria-hidden="true" />
              <div className="flex items-center justify-between mb-4 border-b border-outline-variant/30 pb-4">
                <span className="font-label-caps text-label-caps text-starlight-white uppercase">
                  System Diagnostics
                </span>
                <Radio className="text-primary w-6 h-6" />
              </div>
              <div className="space-y-4 font-label-md text-label-md">
                <div className="flex justify-between">
                  <span className="text-secondary-fixed-dim">Status:</span>
                  <span className="text-primary terminal-text">READY_FOR_DATA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-fixed-dim">Encryption:</span>
                  <span className="text-starlight-white">End-to-End Quantum</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-fixed-dim">Signal Strength:</span>
                  <div className="flex gap-1 items-end">
                    <div className="w-1 h-3 bg-primary" />
                    <div className="w-1 h-4 bg-primary" />
                    <div className="w-1 h-5 bg-primary" />
                    <div className="w-1 h-2 bg-secondary/30" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tip card */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/20 bg-void-black/60 glass-panel">
              <Info className="text-cosmic-teal w-6 h-6" />
              <p className="font-label-md text-label-md text-secondary">
                Tip: Double-click the star map to pin your origin coordinates before sending.
              </p>
            </div>
          </div>

          {/* ─── Right Column ─── */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Interactive Star Map */}
            <div
              ref={starMapRef}
              id="star-map"
              className="glass-panel h-80 relative overflow-hidden group rounded-xl"
              onMouseMove={handleStarMapMouseMove}
              onDoubleClick={handleStarMapDoubleClick}
              role="img"
              aria-label="Interactive star map — double-click to pin origin"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 to-transparent pointer-events-none" />

              {/* Coordinates display */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="font-label-caps text-label-caps text-starlight-white bg-deep-navy/80 px-2 py-1 border border-primary/30">
                  Sector: 7G-Delta
                </span>
                <div className="font-label-md text-label-md text-primary font-mono tabular-nums">
                  X: {coords.x} Y: {coords.y}
                </div>
              </div>

              {/* Pin marker */}
              {pin.visible && (
                <div
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: pin.x,
                    top: pin.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="w-4 h-4 bg-primary rounded-full pulse-dot" />
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-void-black font-label-caps text-[10px] px-2 py-0.5 rounded">
                    Origin Marked
                  </div>
                </div>
              )}

              {/* Decorative star dots */}
              {[
                { top: '20%', left: '15%', size: 2 },
                { top: '60%', left: '30%', size: 1 },
                { top: '35%', left: '55%', size: 2 },
                { top: '70%', left: '70%', size: 1 },
                { top: '15%', left: '80%', size: 2 },
                { top: '50%', left: '90%', size: 1 },
              ].map((star, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-starlight-white opacity-40"
                  style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
                  aria-hidden="true"
                />
              ))}

              <div className="absolute bottom-4 right-4 z-10">
                <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase tracking-widest text-[10px]">
                  Positioning System v2.4
                </span>
              </div>
            </div>

            {/* Signal Composition Form */}
            <div className="glass-panel p-8 md:p-10 flex flex-col gap-8 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Terminal className="text-primary w-6 h-6" />
                </div>
                <h2 className="font-headline-md text-headline-md text-starlight-white">
                  Signal Composition
                </h2>
              </div>

              <form
                id="signal-form"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Originator ID */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="font-label-caps text-label-caps text-secondary uppercase"
                  >
                    Originator ID
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name or Alias"
                    className="cosmic-input bg-surface-container/40 border border-outline-variant/30 p-4 font-body-md text-on-surface rounded-lg transition-all focus:bg-surface-container/60 placeholder:text-outline-variant/60"
                  />
                </div>

                {/* Frequency */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-label-caps text-label-caps text-secondary uppercase"
                  >
                    Frequency
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@frequency.com"
                    className="cosmic-input bg-surface-container/40 border border-outline-variant/30 p-4 font-body-md text-on-surface rounded-lg transition-all focus:bg-surface-container/60 placeholder:text-outline-variant/60"
                  />
                </div>

                {/* Subject Payload */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label
                    htmlFor="contact-subject"
                    className="font-label-caps text-label-caps text-secondary uppercase"
                  >
                    Subject Payload
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="cosmic-select bg-surface-container/40 border border-outline-variant/30 p-4 font-body-md text-on-surface rounded-lg transition-all focus:bg-surface-container/60 appearance-none"
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Content */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-label-caps text-label-caps text-secondary uppercase"
                  >
                    Message Content
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your signal parameters..."
                    className="cosmic-textarea bg-surface-container/40 border border-outline-variant/30 p-4 font-body-md text-on-surface rounded-lg transition-all focus:bg-surface-container/60 placeholder:text-outline-variant/60 resize-none"
                  />
                </div>

                {/* Actions row */}
                <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                  {/* High priority checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      id="urgency"
                      name="highPriority"
                      type="checkbox"
                      checked={formData.highPriority}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-outline-variant bg-surface-container text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="urgency"
                      className="font-label-md text-label-md text-secondary-fixed-dim"
                    >
                      High priority transmission
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-label-caps text-label-caps font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(211,187,255,0.4)] disabled:opacity-80 disabled:cursor-not-allowed ${
                      isSuccess
                        ? 'bg-cosmic-teal text-void-black'
                        : 'bg-primary text-on-primary-fixed'
                    }`}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-starlight-white/0 via-starlight-white/20 to-starlight-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <span className="relative z-10">
                      {isSubmitting
                        ? 'Broadcasting...'
                        : isSuccess
                        ? 'Signal Delivered'
                        : 'Broadcast Signal'}
                    </span>

                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : isSuccess ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact info cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTACT_INFO.map(({ id, icon, iconBg, iconColor, label, value, href, IconComponent }) => (
            <div
              key={id}
              className="glass-panel p-6 flex flex-col gap-4 group hover:bg-surface-container-low transition-colors duration-500 rounded-xl"
            >
              <div
                className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}
              >
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-starlight-white uppercase mb-1">
                  {label}
                </h3>
                {href ? (
                  <a
                    href={href}
                    className="font-body-md text-body-md text-secondary-fixed-dim hover:text-primary transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-body-md text-body-md text-secondary-fixed-dim">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Social links card */}
          <div className="glass-panel p-6 flex flex-col gap-4 group hover:bg-surface-container-low transition-colors duration-500 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-nebula-purple/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6" />
            </div>
            <div className="flex gap-4 flex-wrap">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label-md text-label-md text-secondary-fixed-dim hover:text-primary transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
