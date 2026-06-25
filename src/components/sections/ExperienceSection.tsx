'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { TimelineEntry, EngagementCard } from '@/types'
import { BadgeCheck, Rocket, Telescope, ShieldCheck, Users, Settings, Handshake, BarChart, Zap, ExternalLink } from 'lucide-react'

const TIMELINE: TimelineEntry[] = [
  {
    id: 'current-consultant',
    role: 'AEM Content Operations Consultant (Contract)',
    company: 'Enterprise Digital Agency (Remote)',
    period: 'July 2025 – Present',
    isCurrent: true,
    bullets: [
      'Managing multilingual AEM site operations across 20+ language variations using Live Copy and Blueprint structures for an enterprise insurance client.',
      'Streamlined content fragment authoring workflows, reducing blog publishing time from 60 minutes to 20 minutes through ACS Commons automation and process redesign.',
      'Handling full content deployment pipeline and stakeholder coordination across markets.',
    ],
    tags: ['AEM Cloud', 'EDS', 'Automation', 'Remote'],
  },
  {
    id: 'wcs-team-lead',
    role: 'Web Content Specialist - Team Lead',
    company: 'DEPT®',
    period: 'January 2023 – June 2025 (2 years 6 months)',
    isCurrent: false,
    bullets: [
      'Co-led a 40-member Web Content Services team, managing task distribution, performance tracking, and delivery operations across 8+ enterprise clients simultaneously.',
      'Reduced content authoring time by 60% by introducing ACS Commons-based automation, App Script workflows, and Excel-driven tooling, eliminating repetitive manual tasks across all client projects.',
      'Built internal operational tools including leave management tracking system, content fragment batch processors, and automated deployment scripts for a team of 40+ people.',
      'Managed full AEM deployment pipeline (DEV → UAT → Stage → Production) with Dispatcher and CDN coordination across global enterprise clients including HDFC Bank, Tata AIA, Medtronic, and QuidelOrtho.',
      'Conducted AEM authoring training, SEO best practices workshops, and WCAG accessibility sessions, raising team capability and reducing onboarding time.',
    ],
    tags: ['AEM Sites', 'Team Lead', 'Automation', 'Enterprise'],
  },
  {
    id: 'aem-content-author',
    role: 'Web Content Specialist',
    company: 'DEPT®',
    period: 'July 2022 – December 2022 (6 months)',
    isCurrent: false,
    bullets: [
      'Authored and published structured digital content using AEM Sites for global enterprise websites across 20+ languages.',
      'Managed multi-environment content deployments across DEV, Stage, and Production, ensuring accurate and timely publishing for high-availability sites.',
      'Applied SEO best practices and WCAG accessibility standards to all content outputs, contributing to improved page performance and compliance across client properties.',
    ],
    tags: ['AEM Sites', 'SEO', 'Multilingual', 'Deployment'],
  },
]

const ENGAGEMENTS: EngagementCard[] = [
  {
    id: 'medtronic',
    client: 'Medtronic',
    headline: 'Global Digital Experience',
    body: 'Managed AEM content inheritance, rollout configurations, and Dynamic Media workflows across global healthcare markets. Aligned content architecture with SEO best practices and regional compliance requirements.',
    tags: ['HEALTHCARE', 'Rollout', 'Dynamic Media', 'SEO'],
  },
  {
    id: 'quidelortho',
    client: 'QuidelOrtho',
    headline: 'Multilingual Site Operations',
    body: 'Managed multilingual website content across 20+ language variations using AEM Live Copy and Blueprint structures, ensuring consistent global branding and optimized page performance across markets.',
    tags: ['HEALTHCARE', 'Live Copy', 'i18n', '20+ Languages'],
  },
  {
    id: 'tata-aia',
    client: 'Tata AIA',
    headline: 'Multi-Environment Deployment',
    body: 'Managed complete content deployment pipeline across DEV, Stage, and Production environments. Oversaw package creation, deployment workflows, and coordinated with development teams to ensure zero-downtime releases.',
    tags: ['INSURANCE', 'Deployment', 'Package Mgmt', 'Prod Pipeline'],
  },
  {
    id: 'hdfc-bank',
    client: 'HDFC Bank',
    headline: 'Enterprise Authoring Operations',
    body: 'Led content authoring operations for one of India\'s largest banking websites. Managed delivery timelines, maintained content quality standards, and reduced publishing overhead through workflow restructuring and team coordination.',
    tags: ['BANKING', 'Team Lead', 'Workflow Ops'],
  },
  {
    id: 'oona-insurance',
    client: 'Oona',
    headline: 'Workflow Automation - 66% Time Reduction',
    body: 'Streamlined the content fragment authoring process, reducing blog article publishing time from 60 minutes to 20 minutes. Automated package deployment to pre-production environments, eliminating manual execution steps entirely.',
    tags: ['INSURANCE', 'SINGAPORE', 'Automation', 'ACS Commons', 'EDS'],
    span: 2,
    metrics: [
      { value: '-66%', label: 'Authoring Time' },
      { value: 'Auto', label: 'Deployment' },
    ],
    icon: Zap,
  },
  {
    id: 'hdfc-life',
    client: 'HDFC Life',
    headline: 'Scalable Content Architecture',
    body: 'Coordinated directly with business stakeholders to gather authoring requirements and translate them into scalable AEM content fragment structures. Managed task allocation and project tracking via Jira.',
    tags: ['INSURANCE', 'CF Modeling', 'Stakeholder Mgmt', 'Jira'],
  },
  {
    id: 'indiafirst-life',
    client: 'IndiaFirst Life',
    headline: 'Cross-Client Automation & Delegation',
    body: 'Managed end-to-end client communication, translated business requirements into authoring workflows, and improved team efficiency by introducing content fragment automation processes across the engagement.',
    tags: ['INSURANCE', 'Automation', 'Client Comms', 'Team Ops'],
  },
  {
    id: 'rosewood-hotels',
    client: 'Rosewood Hotels',
    headline: 'Luxury Property Digital Operations',
    body: 'Oversaw digital content operations for global luxury hotel properties, gathering pre-launch requirements, delegating tasks across the authoring team, and ensuring high-quality content delivery for new property go-lives.',
    tags: ['HOSPITALITY', 'Launch Ops', 'Content Strategy'],
  },
]

export default function ExperienceSection() {
  const timelineItemsRef = useRef<NodeListOf<Element> | null>(null)

  // IntersectionObserver for timeline node glow effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const node = entry.target.querySelector<HTMLElement>('.timeline-node')
          if (!node) return
          if (entry.isIntersecting) {
            node.classList.add('timeline-node-active', 'bg-primary')
            node.classList.remove('bg-primary/40')
          } else {
            node.classList.remove('timeline-node-active', 'bg-primary')
            node.classList.add('bg-primary/40')
          }
        })
      },
      { threshold: 0.5 }
    )

    const items = document.querySelectorAll('.timeline-item')
    timelineItemsRef.current = items
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      className="py-24 px-gutter max-w-container-max mx-auto space-y-24"
    >
      {/* ─── Global Enterprise Impact ─── */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-4">
              Global Enterprise Impact
            </h2>
            <p className="text-secondary">
              Delivering measurable outcomes across banking, insurance, healthcare, and hospitality, spanning 3+ years and 8 enterprise engagements.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { val: '8+', lbl: 'Enterprise Clients' },
            { val: '20+', lbl: 'Language Rollouts' },
            { val: '60%', lbl: 'Publishing Time Reduction' },
            { val: '3', lbl: 'Industry Sectors' },
          ].map((stat) => (
            <div key={stat.lbl} className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-center">
              <div className="text-primary font-bold text-2xl md:text-3xl">{stat.val}</div>
              <div className="text-secondary-fixed-dim text-xs font-label-caps mt-1">{stat.lbl}</div>
            </div>
          ))}
        </div>

        {/* Bento hero grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          {/* Current role card — wide */}
          <div className="md:col-span-8 glass-card p-1 rounded-xl overflow-hidden group border-0">
            <div className="relative h-full bg-deep-navy/30 p-8 flex flex-col justify-end min-h-[400px] overflow-hidden">
              {/* Abstract nebula gradient */}
              <div className="absolute inset-0 z-0" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-br from-void-black via-nebula-purple/20 to-deep-navy" />
                <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-nebula-purple/30"
                  style={{ filter: 'blur(60px)' }} />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-cosmic-teal/20"
                  style={{ filter: 'blur(50px)' }} />
                {[...Array(18)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-starlight-white"
                    style={{
                      width: i % 3 === 0 ? 2 : 1,
                      height: i % 3 === 0 ? 2 : 1,
                      top: `${10 + (i * 37) % 80}%`,
                      left: `${5 + (i * 53) % 90}%`,
                      opacity: 0.2 + (i % 5) * 0.1,
                    }}
                  />
                ))}
                <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: 'linear-gradient(rgba(211,187,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(211,187,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
              </div>

              <div className="relative z-10">
                <span className="font-label-caps text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  CURRENT ROLE
                </span>
                <h3 className="font-headline-lg text-headline-lg text-starlight-white mt-4 mb-2 role-title">
                  <span className="block">AEM Content Operations Consultant</span>
                  <span className="block text-primary/80 mt-1 text-base sm:text-lg">Enterprise Digital Agency</span>
                </h3>
                <p className="text-secondary max-w-lg mb-5">
                  Managing multilingual AEM site operations, workflow automation, and content deployment pipelines for enterprise clients.
                </p>
                {/* Stat chips */}
                <div className="flex flex-wrap gap-3 mb-5">
                  {[{ val: '3+ Years', lbl: 'Enterprise AEM' }, { val: '20+', lbl: 'Languages' }, { val: '66%', lbl: 'Time Saved' }].map((stat) => (
                    <div key={stat.lbl} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-center">
                      <div className="text-primary font-bold text-base">{stat.val}</div>
                      <div className="text-secondary-fixed-dim text-[10px] font-label-caps">{stat.lbl}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {['AEM CLOUD', 'EDS', 'AUTOMATION'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-label-md text-cosmic-teal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Adobe Certified card */}
          <div className="md:col-span-4 glass-card p-1 rounded-xl overflow-hidden group border-0">
            <div className="relative h-full bg-deep-navy/30 p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-nebula-purple/20 rounded-full flex items-center justify-center mb-6 border border-nebula-purple/30 group-hover:scale-110 transition-transform">
                  <BadgeCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-headline-md text-headline-md text-starlight-white mb-4">
                Adobe Certified Expert
              </h3>
              <p className="text-secondary mb-8">
                Recognized AEM Sites Business Practitioner with deep technical command over CMS
                architecture and SEO-optimized workflows.
              </p>
              <ul className="space-y-3 text-left w-full">
                {[
                  'Multi-environment Deployment',
                  'Content Fragment Modeling',
                  'SEO Best Practices',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-label-md text-starlight-white">
                    <Rocket className="text-primary w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Career Timeline ─── */}
      <div>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sticky sidebar */}
          <div className="w-full md:w-1/3 md:sticky md:top-24">
            <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-6">
              Career Timeline
            </h2>
            <p className="text-secondary mb-8">
              A focused trajectory building enterprise AEM expertise, from content authoring to leading multi-client operations.
            </p>
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-nebula-purple/20">
                  <ShieldCheck className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-primary">Role Certification</p>
                  <p className="text-starlight-white font-semibold">Adobe Certified Expert</p>
                </div>
              </div>
              <p className="font-label-md text-label-md text-secondary-fixed-dim">
                Certified Sites Business Practitioner specializing in content management and system
                orchestration.
              </p>
            </div>
          </div>

          {/* Career Timeline entries */}
          <div className="w-full md:w-2/3">
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[7px] top-[20px] bottom-0 w-px timeline-connector"
                aria-hidden="true"
              />

              <div className="space-y-12">
                {TIMELINE.map((entry) => (
                  <div key={entry.id} className="relative timeline-item flex gap-6">
                    {/* Timeline node */}
                    <div className="shrink-0 mt-3">
                      <div
                        className={`w-4 h-4 rounded-full ring-4 z-10 timeline-node relative ${
                          entry.isCurrent
                            ? 'bg-primary ring-nebula-purple/30 timeline-node-active'
                            : 'bg-primary/40 ring-nebula-purple/10'
                        }`}
                      />
                    </div>

                    <div className="glass-card p-6 sm:p-8 rounded-2xl flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5">
                        <div className="min-w-0">
                          <h3 className="font-headline-md text-headline-md text-starlight-white">
                            {entry.role}
                          </h3>
                          <p className="text-primary font-label-md">{entry.company}</p>
                        </div>
                        <span
                          className={`shrink-0 px-3 py-1.5 rounded-xl sm:rounded-full font-label-caps text-label-caps sm:whitespace-nowrap whitespace-normal w-fit max-w-full text-left sm:text-center ${
                            entry.isCurrent
                              ? 'bg-nebula-purple/20 text-primary border border-primary/20'
                              : 'bg-surface-container/40 text-secondary border border-outline-variant/30'
                          }`}
                        >
                          {entry.period}
                        </span>
                      </div>

                      <ul className="space-y-3 text-secondary">
                        {entry.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-primary shrink-0 mt-0.5">
                              {i === 0 ? <Users className="w-4 h-4" /> : i === 1 ? <Settings className="w-4 h-4" /> : <Handshake className="w-4 h-4" />}
                            </span>
                            <span className="text-sm leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {entry.tags && (
                        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-outline-variant/10">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full font-label-md text-xs text-cosmic-teal"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Strategic Engagements ─── */}
      <section id="projects" className="scroll-mt-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-starlight-white">
              Strategic Engagements
            </h2>
            <p className="text-secondary max-w-xl mt-2">
              Notable collaborations with global industry leaders, delivering optimized digital
              experiences across sectors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGAGEMENTS.map((eng) => (
            <div
              key={eng.id}
              className={`group glass-card p-8 rounded-2xl hover:-translate-y-2 transition-all duration-500 ${
                eng.span === 2 ? 'lg:col-span-2' : ''
              }`}
            >
              {eng.icon ? (
                // Wide card with icon + metrics
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full bg-nebula-purple/20 flex items-center justify-center">
                      {eng.icon && <eng.icon className="text-primary w-8 h-8" />}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="font-headline-md text-headline-md text-starlight-white">
                        {eng.client}
                      </h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-label-caps rounded-full">
                        {eng.tags[0]}
                      </span>
                    </div>
                    <p className="font-label-md text-secondary mb-6">{eng.body}</p>
                    {eng.metrics && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {eng.metrics.map((m) => (
                          <div key={m.label} className="p-4 glass-card rounded-xl text-center">
                            <div className="text-primary font-bold text-xl">{m.value}</div>
                            <div className="text-[10px] font-label-caps text-secondary-fixed-dim uppercase">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Standard card
                <>
                  <div className="h-16 flex items-center mb-6">
                    <div className="text-starlight-white font-bold text-2xl tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                      {eng.client.toUpperCase()}
                    </div>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-starlight-white mb-3">
                    {eng.headline}
                  </h3>
                  <p className="font-label-md text-secondary line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {eng.body}
                  </p>
                  <div className="mt-6 pt-6 border-t border-outline-variant/20 flex gap-2 flex-wrap">
                    {eng.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-surface-container/40 rounded text-[10px] font-label-caps text-primary uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Technical Capabilities ─── */}
      <div className="glass-card p-12 rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 skills-chart bar-chart" aria-hidden="true">
          <BarChart className="w-32 h-32 text-primary" />
        </div>
        <div className="relative z-10">
          <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-2">
            Full AEM Stack - Without Writing Code
          </h2>
          <p className="text-secondary mb-8">
            End-to-end expertise across the Adobe Experience Manager ecosystem, from content architecture to production deployment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Group 1: AEM Core */}
            <div className="space-y-4">
              <h3 className="font-headline-sm text-primary border-b border-primary/20 pb-2">AEM Core</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Adobe Experience Manager (AEM Sites)',
                  'AEM as a Cloud Service',
                  'Edge Delivery Services (EDS / Franklin)',
                  'Content Fragment Modeling & Automation',
                  'Experience Fragment Architecture',
                  'Dynamic Media',
                  'ACS Commons Automation',
                  'Package Deployment (DEV → UAT → Stage → Prod)',
                  'Dispatcher Configuration & CDN Basics',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full font-label-md text-xs text-starlight-white hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Group 2: Content & Strategy */}
            <div className="space-y-4">
              <h3 className="font-headline-sm text-primary border-b border-primary/20 pb-2">Content & Strategy</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Multilingual Content Management',
                  'Live Copy & Blueprint Structures',
                  'Language Copy & i18n',
                  'SEO Tag Management & Structured Content',
                  'WCAG Accessibility Standards',
                  'JSON Authoring',
                  'AEM Guides (XML Authoring - basics)',
                  'Headless CMS Concepts',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full font-label-md text-xs text-starlight-white hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Group 3: Operations & Tools */}
            <div className="space-y-4">
              <h3 className="font-headline-sm text-primary border-b border-primary/20 pb-2">Operations & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Jira - Agile Project Coordination',
                  'Stakeholder Requirement Gathering',
                  'Dev Ticket Creation & QA Verification',
                  'App Scripts & Excel Automation',
                  'Team Operations (40+ member teams)',
                  'Leave & Resource Tracking Systems',
                  'ProofHub Project Management',
                  'Cross-functional Delivery Coordination',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full font-label-md text-xs text-starlight-white hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
