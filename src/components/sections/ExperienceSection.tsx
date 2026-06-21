'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { TimelineEntry, EngagementCard } from '@/types'

const TIMELINE: TimelineEntry[] = [
  {
    id: 'wcs-team-lead',
    role: 'WCS Team Lead',
    company: 'Dept',
    period: 'January 2023 – Present',
    isCurrent: true,
    bullets: [
      'Overseeing a 40-member team, handling performance tracking, and daily operations ensuring high-quality deliverables.',
      'Driving automation initiatives, including package creation automation to significantly enhance team efficiency.',
      'Coordinating with clients to align project goals and expectations across diverse market requirements.',
    ],
  },
  {
    id: 'aem-content-author',
    role: 'AEM Content Author',
    company: 'Dept',
    period: 'July 2022 – December 2022',
    isCurrent: false,
    bullets: [
      'Developed and maintained web content in AEM, collaborating with cross-functional teams to ensure accuracy, relevance, and optimization for SEO and user experience.',
      'Managed multi-environment deployments for high-availability sites.',
    ],
  },
]

const ENGAGEMENTS: EngagementCard[] = [
  {
    id: 'medtronic',
    client: 'Medtronic',
    headline: 'Medtronic 75',
    body: 'Extensive experience in inheritance, rollout, and dynamic media workflows. Aligned content strategies with SEO best practices for diverse markets.',
    tags: ['Rollout', 'SEO'],
  },
  {
    id: 'tata-aia',
    client: 'Tata AIA',
    headline: 'Life Insurance',
    body: 'Handled multiple environments including development, staging, and production. Enhanced expertise in package deployment and operational landscape.',
    tags: ['Ops', 'Deployment'],
  },
  {
    id: 'hdfc',
    client: 'HDFC Bank',
    headline: 'Workflow Automation',
    body: 'Managed timelines and streamlined workflows as team lead. Increased efficiency by automating the content fragment authoring process.',
    tags: ['Leadership', 'Automation'],
  },
  {
    id: 'oona',
    client: 'Oona',
    headline: 'Automation Success',
    body: 'Automated fragment creation, reducing blog article authoring time from 1 hour to just 20 minutes. Streamlined package creation through automated deployment to pre-prod environments, eliminating manual execution.',
    tags: ['Automation Success'],
    span: 2,
    metrics: [
      { value: '-66%', label: 'Time Reduced' },
      { value: 'Auto', label: 'Deployment' },
    ],
    icon: 'bolt',
  },
  {
    id: 'rosewood',
    client: 'Rosewood',
    headline: 'Luxury Hospitality',
    body: 'Gathered requirements for property launches, delegated tasks, and provided solutions for high-end boutique properties.',
    tags: ['Hospitality', 'Boutique'],
  },
]

const TECHNICAL_SKILLS = [
  'Adobe Experience Manager (AEM)',
  'Live Copy & Blueprinting',
  'Experience Fragments',
  'SEO Optimization',
  'Agile Methodologies (Jira)',
  'JSON Authoring',
  'Responsive Web Layout',
  'Dynamic Media',
]

const ENGAGEMENT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAoO7-zbv-LvK3udiwjBPI8xN1xAtL9VRt06LVakhisAQkSXWFcBEfMpvyZBZcm0AA4UVR5LiSFzhqWavNRM_6W70ZbNfqm-sqqBrWBoQ4FM61oI8hG3296Ax0dyU2icXD9slho-esFVINjbUraiUZOylcCXI99HMzj21rzIToOuIc4ysw8Sed4HGaXMlREPi5QPj7BzBx0IPovicZxm3XyuxWBdwku21HGfMCBQ-0A9Fh1yhDVhiRYdu7spWx4x-B0XLJyMDID5aQ'

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
      {/* ─── Career Timeline ─── */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-4">
              Professional Engagements
            </h2>
            <p className="text-secondary">
              A curated timeline of high-impact digital transformations for global industry leaders.
            </p>
          </div>
          <div className="font-label-caps text-primary border-b border-primary/30 pb-2">
            VIEW ALL CASE STUDIES
          </div>
        </div>

        {/* Bento hero grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          {/* Current role card — wide */}
          <div className="md:col-span-8 glass-card p-1 rounded-xl overflow-hidden group border-0">
            <div className="relative h-full bg-deep-navy/30 p-8 flex flex-col justify-end min-h-[400px]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjNYXZBlx-r2se1UI5kyuxKCba65YYeYIUg75z6p7O_CGOeJiVUMMYXwMZMaKDuLaSlyDvUbTBNa4dPmPEEhMKlD0F_fH9CUqi7_YaUcqDfD9JyWZij2l75ZreNQiEsyEWO1Vc6pUcKs6RvpTnljnsYuXVS97I9pFO2mk61SkfChb_QxF2fecWfFrD4xAxGx3fjN7y4zbcWpKNZAcUT5yR5U_97GZZFzbXPbhXKS2RJoLhgBON67zMbU4z1TW6ATjiAfWEFwT5-uE"
                alt="Team Lead at WCS"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700"
              />
              <div className="relative z-10">
                <span className="font-label-caps text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  CURRENT ROLE
                </span>
                <h3 className="font-headline-lg text-headline-lg text-starlight-white mt-4 mb-2">
                  Team Lead at WCS (Dept)
                </h3>
                <p className="text-secondary max-w-lg mb-6">
                  Leading a 40-member team in automating AEM content fragments, reducing authoring
                  time by 60% and ensuring global brand consistency across 20+ languages.
                </p>
                <div className="flex gap-3 flex-wrap">
                  {['AEM SITES', 'AUTOMATION', 'LEADERSHIP'].map((tag) => (
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
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
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
                    <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Astronomy enthusiast card */}
          <div className="md:col-span-4 glass-card p-1 rounded-xl group border-0">
            <div className="bg-deep-navy/30 p-8 h-full">
              <h4 className="font-label-caps text-primary mb-4">ASTRONOMY ENTHUSIAST</h4>
              <div className="aspect-video bg-void-black/40 rounded-lg mb-6 overflow-hidden relative border border-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-nebula-purple text-5xl opacity-30">
                  telescope
                </span>
              </div>
              <p className="text-secondary">
                Exploring the Andromeda galaxy through the lens of scientific curiosity and
                pixel-perfect precision.
              </p>
            </div>
          </div>

          {/* Global impact card */}
          <div className="md:col-span-8 glass-card p-1 rounded-xl group overflow-hidden border-0">
            <div className="bg-deep-navy/30 p-8 h-full flex items-center gap-8">
              <div className="hidden sm:block w-48 h-48 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
                <Image
                  src={ENGAGEMENT_IMAGE}
                  alt="Global project engagements"
                  fill
                  sizes="192px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-starlight-white mb-2">
                  Global Impact
                </h3>
                <p className="text-secondary mb-4">
                  Driving digital excellence for giants like Medtronic, Tata AIA, and HDFC Bank
                  through optimized AEM strategies and seamless user experiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-label-caps text-secondary-fixed-dim border border-secondary-fixed-dim/30 px-2 py-1 rounded">
                    20+ LANGUAGES
                  </span>
                  <span className="text-xs font-label-caps text-secondary-fixed-dim border border-secondary-fixed-dim/30 px-2 py-1 rounded">
                    GLOBAL ROLLOUT
                  </span>
                </div>
              </div>
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
              A focused trajectory from AEM Content Author to WCS Team Lead at Adobe, managing
              scale and complexity.
            </p>
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-nebula-purple/20">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
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

          {/* Timeline entries */}
          <div className="w-full md:w-2/3 relative pl-8 md:pl-12">
            {/* Vertical connector */}
            <div className="absolute left-0 top-0 bottom-0 w-px timeline-connector" aria-hidden="true" />

            <div className="space-y-16">
              {TIMELINE.map((entry) => (
                <div key={entry.id} className="relative timeline-item">
                  {/* Timeline node */}
                  <div
                    className={`absolute -left-[37px] md:-left-[53px] top-2 w-4 h-4 rounded-full ring-4 z-10 timeline-node ${
                      entry.isCurrent
                        ? 'bg-primary ring-nebula-purple/20 timeline-node-active'
                        : 'bg-primary ring-nebula-purple/10'
                    }`}
                  />

                  <div className="glass-card p-8 rounded-2xl">
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mb-6">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-starlight-white">
                          {entry.role}
                        </h3>
                        <p className="text-primary font-label-md">{entry.company}</p>
                      </div>
                      <span
                        className={`px-4 py-1.5 rounded-full font-label-caps text-label-caps ${
                          entry.isCurrent
                            ? 'bg-nebula-purple/20 text-primary border border-primary/20'
                            : 'bg-surface-container/40 text-secondary border border-outline-variant/30'
                        }`}
                      >
                        {entry.period}
                      </span>
                    </div>

                    <ul className="space-y-4 text-secondary">
                      {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="material-symbols-outlined text-primary shrink-0">
                            {i === 0 ? 'groups' : i === 1 ? 'rule_settings' : 'handshake'}
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Strategic Engagements ─── */}
      <div>
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
                      <span className="material-symbols-outlined text-primary text-3xl">
                        {eng.icon}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h4 className="font-headline-md text-headline-md text-starlight-white">
                        {eng.client}
                      </h4>
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
                  <h4 className="font-headline-md text-headline-md text-starlight-white mb-3">
                    {eng.headline}
                  </h4>
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
      </div>

      {/* ─── Technical Capabilities ─── */}
      <div className="glass-card p-12 rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10" aria-hidden="true">
          <span className="material-symbols-outlined text-9xl text-primary">analytics</span>
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-8">
            Specialized Technical Capabilities
          </h2>
          <div className="flex flex-wrap gap-3">
            {TECHNICAL_SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 glass-card rounded-full font-label-md text-primary hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
