'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import { Radio, Info, Terminal, Loader2, CheckCircle, Send, Share2, AtSign, Globe, X, Briefcase, MapPin, Award, ChevronDown, Check } from 'lucide-react'
import type { ContactFormData } from '@/types'

const SUBJECT_OPTIONS = [
  'AEM Contract Enquiry',
  'Freelance Collaboration',
  'Technical Consultation',
  'Astronomy / Stargazing',
  'General Enquiry',
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
    value: 'Mumbai, Maharashtra, India (IST UTC+5:30)',
    href: null,
    IconComponent: Globe,
  },
] as const

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ilasariyadeep13/' },
  { label: 'GitHub', href: 'https://github.com/ilasariyadeep' },
  { label: 'Instagram', href: 'https://www.instagram.com/galactic.shots/' },
] as const

const DEFAULT_FORM: ContactFormData = {
  name: '',
  email: '',
  subject: 'AEM Contract Enquiry',
  message: '',
  highPriority: false,
}

export default function ContactSection() {
  const { contactFormStatus, setContactFormStatus } = usePortfolioStore()
  const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelectOption = useCallback((option: typeof SUBJECT_OPTIONS[number]) => {
    setFormData((prev) => ({
      ...prev,
      subject: option,
    }))
    setIsDropdownOpen(false)
  }, [])

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

      try {
        const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'cf9aacbc-7afe-44b9-bb65-ca0c8d81fa28'
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: key,
            name: formData.name,
            email: formData.email,
            subject: `[Portfolio Signal] ${formData.subject} ${formData.highPriority ? '🚨' : ''}`,
            message: formData.message,
            from_name: `${formData.name} (Via Portfolio)`,
            replyto: formData.email,
          }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Web3Forms API call failed')
        }

        setContactFormStatus('success')

        // Reset after success display
        setTimeout(() => {
          setContactFormStatus('idle')
          setFormData(DEFAULT_FORM)
        }, 3000)
      } catch (err) {
        console.error('Failed to send message:', err)
        setContactFormStatus('error')

        // Reset back to idle after 3 seconds
        setTimeout(() => {
          setContactFormStatus('idle')
        }, 3000)
      }
    },
    [formData, setContactFormStatus]
  )

  const isSubmitting = contactFormStatus === 'submitting'
  const isSuccess = contactFormStatus === 'success'
  const isError = contactFormStatus === 'error'

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

              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-starlight-white leading-none text-glow">
                Get in Touch
              </h2>

              <p className="font-body-lg text-body-lg text-secondary-fixed-dim max-w-md">
                Always happy to connect. Feel free to reach out and I will get back to you.
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
                  <span className="text-secondary-fixed-dim">Availability:</span>
                  <span className="text-primary terminal-text">OPEN TO CONNECT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-fixed-dim">Timezone:</span>
                  <span className="text-starlight-white">IST (UTC +5:30) - APAC / EMEA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-fixed-dim">Response Time:</span>
                  <span className="text-starlight-white">Within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Tip card */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/20 bg-void-black/60 glass-panel">
              <Info className="text-cosmic-teal w-6 h-6 shrink-0" />
              <p className="font-label-md text-label-md text-secondary">
                Preferred engagements: AEM content operations, workflow automation, multilingual CMS, collaborations.
              </p>
            </div>
          </div>

          {/* ─── Right Column ─── */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Current Status Card */}
            <div
              className="glass-panel p-8 relative overflow-hidden rounded-xl flex flex-col justify-center min-h-[320px]"
            >
              <h3 className="font-headline-md text-headline-md text-starlight-white mb-6 border-b border-outline-variant/30 pb-3 uppercase tracking-wider">
                Current Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-body-md text-body-md">
                {[
                  { label: 'Role', val: 'AEM Solutions Consultant', Icon: Briefcase, color: 'text-primary' },
                  { label: 'Location', val: 'Mumbai, India (Remote)', Icon: MapPin, color: 'text-cosmic-teal' },
                  { label: 'Markets', val: 'Global Projects', Icon: Globe, color: 'text-primary' },
                  { label: 'Certificate', val: 'Adobe Certified Expert', Icon: Award, color: 'text-cosmic-teal' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
                    <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 ${item.color}`}>
                      <item.Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-secondary-fixed-dim font-label-caps text-xs tracking-wider mb-1">{item.label}</span>
                      <span className="text-starlight-white font-semibold leading-snug">{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Composition Form */}
            <div className="glass-panel p-8 md:p-10 flex flex-col gap-8 rounded-xl">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Terminal className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-starlight-white">
                    Signal Composition
                  </h3>
                </div>
                <p className="text-sm text-secondary border-l-2 border-primary/50 pl-4 py-1">
                  Always happy to connect with teams working on interesting AEM challenges. Feel free to reach out.
                </p>
              </div>

              <form
                id="signal-form"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Your Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="font-label-caps text-label-caps text-secondary uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name or Alias"
                    className="cosmic-input bg-surface-container/40 border border-outline-variant/30 p-4 font-body-md text-on-surface rounded-lg transition-all focus:bg-surface-container/60 placeholder:text-outline-variant/60"
                  />
                </div>

                {/* Your Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-label-caps text-label-caps text-secondary uppercase"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@frequency.com"
                    className="cosmic-input bg-surface-container/40 border border-outline-variant/30 p-4 font-body-md text-on-surface rounded-lg transition-all focus:bg-surface-container/60 placeholder:text-outline-variant/60"
                  />
                </div>

                {/* Enquiry Type */}
                <div className="md:col-span-2 flex flex-col gap-2" ref={dropdownRef}>
                  <label
                    htmlFor="contact-subject-trigger"
                    className="font-label-caps text-label-caps text-secondary uppercase"
                  >
                    Enquiry Type
                  </label>
                  <div className="relative">
                    {/* Custom Dropdown Trigger */}
                    <button
                      id="contact-subject-trigger"
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      className={`cosmic-select w-full flex items-center justify-between bg-surface-container/40 border p-4 pr-5 font-body-md text-on-surface rounded-lg transition-all focus:bg-surface-container/60 cursor-pointer text-left ${
                        isDropdownOpen 
                          ? 'border-primary shadow-[0_0_15px_rgba(76,29,149,0.3)] bg-surface-container/60' 
                          : 'border-outline-variant/30'
                      }`}
                    >
                      <span>{formData.subject}</span>
                      <ChevronDown className={`w-5 h-5 text-secondary transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>

                    {/* Custom Dropdown Menu Panel */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-2 z-50 glass-panel border border-outline-variant/30 rounded-lg shadow-2xl overflow-hidden custom-dropdown-panel">
                        <div className="py-1 bg-void-black/95 divide-y divide-outline-variant/10">
                          {SUBJECT_OPTIONS.map((opt) => {
                            const isSelected = formData.subject === opt
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleSelectOption(opt)}
                                className={`w-full flex items-center justify-between px-5 py-3.5 text-left font-body-md transition-colors hover:bg-primary/10 ${
                                  isSelected 
                                    ? 'bg-primary/5 text-primary font-semibold' 
                                    : 'text-secondary-fixed-dim hover:text-starlight-white'
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
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
                    autoComplete="off"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or requirement..."
                    className="cosmic-textarea bg-surface-container/40 border border-outline-variant/30 p-4 font-body-md text-on-surface rounded-lg transition-all focus:bg-surface-container/60 placeholder:text-outline-variant/60 resize-none"
                  />
                </div>

                {/* Actions row */}
                <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                  {/* Mark as urgent */}
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
                      Mark as urgent
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess || isError}
                    className={`group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-label-caps text-label-caps font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(211,187,255,0.4)] disabled:opacity-80 disabled:cursor-not-allowed ${
                      isSuccess
                        ? 'bg-cosmic-teal text-void-black'
                        : isError
                        ? 'bg-rose-500 text-white'
                        : 'bg-primary text-on-primary-fixed'
                    }`}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-starlight-white/0 via-starlight-white/20 to-starlight-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <span className="relative z-10">
                      {isSubmitting
                        ? 'Sending...'
                        : isSuccess
                        ? 'Message Sent'
                        : isError
                        ? 'Failed to Send'
                        : 'Send Message'}
                    </span>

                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isSuccess ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : isError ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
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
