import Image from 'next/image'
import Link from 'next/link'
import type { GalleryItem, CertCard } from '@/types'

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'orion',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB40QzPWWwzc87bDjc-0FtfmQed7po_0TKOrRdODuaKr9hp88-5SHBihQ4egiw2P9r_tspFspVpZLGGMeJgddyk29H0x_nBP04o-venFmnNFNdYHc_G1RuJHvrnue5ZCGqToWOONjZEqeKQRPQNFgWYeq3U9f49oMUKtcgKHySkOA_GDqGilSumOZuoZXu-feOuvE0vMsHiWqt2vvDPxlYGOjzOhM6vyGy5N09EJRMMTjgpkln-a4raQcLqPhkFAuiJ37ISrF9zpcc',
    alt: 'Orion Nebula M42',
    caption: 'Nebula M42',
    meta: 'Light travel time: 1,344 Years',
  },
  {
    id: 'andromeda',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpO7_UT7HuWLnGf10BVENUlPXcQdhdaTF-YC4VPZk38izfbpe7AWxwHX-8pWn8qTy9K3fKaW4tpH8IRi5N9IWikwAVVG3NcdkXY05Neqw9r7SVCROwnRUw0XTDX52YcAGMPpYSwWz8b2Q2zI1E-chxildHQ1RLnn_d3RX-N1KfytdS4ws1qdyyEaWH6AX4BxKB4Iul5-rJDmE6TPwe8vMc6F2VJVanq5vBRfNRWS3VYY2ymRr7dR1bmrCx_sv0pjBvPoHbNZdRrhI',
    alt: 'Andromeda Galaxy M31',
    caption: 'Andromeda Galaxy',
    meta: 'Distance: 2.5 Million LY',
  },
  {
    id: 'pleiades',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT9Z2KqDRhbnUC1Gjh30AbWsmXkE8WrMR5jEcok-stwBnFkGa49zoyU9gXFog9_3O8Yq-E8myAHs2ENEwGUenjybgpAAwSv0XP5EWtpTORRE8mRmemKTDEhqvK0miofdCa19tp_zxtMJRGVm6No8-WtYebXph43MYFkOZ5BWnfi2w_-kbuDFsAhNTdTy9Uqgi1JUZhJ_PL65AmK6KUlbLSL4vNsNChsN_voV9_T6KHIKN4iSBGMJ6DOFE3TC3WHGMVjvAcqQgj3Ho',
    alt: 'Pleiades Star Cluster M45',
    caption: 'Star Cluster M45',
    meta: 'Exposure: 4 Hours Cumulative',
  },
]

const CERTS: CertCard[] = [
  {
    id: 'nss',
    icon: 'military_tech',
    iconColor: 'text-primary',
    label: 'ORGANIZATION | IMPACT',
    value: 'NSS Head (2019–2020)',
    span: 2,
    tags: ['ORGANIZATION', 'IMPACT'],
  },
  {
    id: 'adobe',
    icon: 'verified',
    iconColor: 'text-cosmic-teal',
    label: 'ADOBE CERTIFIED',
    value: 'AEM Sites Business Practitioner',
  },
  {
    id: 'jhu',
    icon: 'workspace_premium',
    iconColor: 'text-cosmic-teal',
    label: 'JOHNS HOPKINS',
    value: 'Data Science & R Programming',
  },
  {
    id: 'ltc',
    icon: 'groups',
    iconColor: 'text-primary',
    label: 'LTC',
    value: 'Leadership Training Camp – UoM',
  },
  {
    id: 'idf',
    icon: 'diversity_3',
    iconColor: 'text-nebula-purple',
    label: 'INDIAN DEVELOPMENT FOUNDATION',
    value: 'Student Leadership Programme',
    span: 2,
  },
  {
    id: 'python',
    icon: 'biotech',
    iconColor: 'text-cosmic-teal',
    label: "YUVI PATEL'S",
    value: 'Python for Data Science',
  },
]

const VOLUNTEERING_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDGXjvMsC-fsh7U_xATupcVGCAwe-Ntgh1wwfPcaCFrPll62hEQqjYYQfmSUMmeuAu-lyYk4JvSryMb6ESYC5-_8BIaqEfueI_2M7JMOGnmpW8fCKHWmhKP-_ynxdAN314un3zejoX39QWWWKumLW48hUP0qBT8ikhrBxWOrZtEDSwCAHuPPCvSrXPw0eOy0i45hJOmPMfuJDdYQtsRftD889FLP3PiB2WcTbP7oSoGhwwXK8Myuj1bRzK6wiWL4XGb0yNjxRp6pDY'

export default function AstronomySection() {
  return (
    <section
      id="astronomy"
      className="py-24 px-gutter max-w-container-max mx-auto space-y-24"
    >
      {/* ─── Astronomy Hero ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[400px]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nebula-purple/20 border border-nebula-purple/40">
            <span className="material-symbols-outlined text-base text-primary">auto_awesome</span>
            <span className="font-label-caps text-label-caps text-primary">Scientific Explorer</span>
          </div>

          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-starlight-white leading-tight">
            Gazing into the{' '}
            <span className="text-primary">Cosmic Void.</span>
          </h2>

          <p className="font-body-lg text-body-lg text-secondary leading-relaxed max-w-lg">
            Beyond Adobe Experience Manager and technical workflows lies a passion for the infinite.
            From capturing the faint light of distant galaxies to educating the next generation of
            celestial observers.
          </p>

          <div className="flex gap-4 pt-4">
            <a
              href="#astronomy-gallery"
              // onClick={(e) => {
              //   e.preventDefault()
              //   document.getElementById('astronomy-gallery')?.scrollIntoView({ behavior: 'smooth' })
              // }}
              className="px-8 py-3 bg-nebula-purple rounded-lg font-label-caps text-label-caps text-starlight-white flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-nebula-purple/20"
            >
              View Astrophotography
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
            </a>
          </div>
        </div>

        {/* Hero glass card with live sim badge */}
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden glass-card group border-nebula-purple/30">
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-60" />
          {/* Animated stars inside the card */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div
                className="absolute inset-0 border border-primary/20 rounded-full"
                style={{ animation: 'spin 20s linear infinite' }}
              />
              <div
                className="absolute inset-6 border border-nebula-purple/30 rounded-full"
                style={{ animation: 'spin 14s linear infinite reverse' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-6xl opacity-60">
                  telescope
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 p-4 glass-panel rounded-xl">
            <p className="font-label-caps text-label-caps text-starlight-white">
              Live Simulation: Galactic Drift
            </p>
          </div>
        </div>
      </div>

      {/* ─── Volunteering ─── */}
      <div className="space-y-12" id="volunteering">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-outline-variant/20 pb-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-starlight-white">
              Community &amp; Education
            </h2>
            <p className="font-body-md text-body-md text-secondary mt-2">
              Empowering minds through ARC Educators
            </p>
          </div>
          <Link
            href="https://www.arceducators.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-caps text-label-caps text-primary hover:underline flex items-center gap-2"
          >
            Visit Website
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main volunteering card */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-starlight-white">
                  Volunteering at ARC Educators
                </h3>
                <p className="font-body-md text-body-md text-secondary mt-2">
                  Dedicated to fostering a love for STEM and providing quality educational resources.
                  My role involves coordinating workshops and managing digital presence to reach
                  aspiring students across India.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-void-black/40 rounded-xl border border-outline-variant/10">
                <h4 className="font-label-caps text-label-caps text-primary mb-2">
                  Digital Strategy
                </h4>
                <p className="text-sm text-secondary">
                  Leveraging AEM expertise to optimize educational content delivery for remote learners.
                </p>
              </div>
              <div className="p-4 bg-void-black/40 rounded-xl border border-outline-variant/10">
                <h4 className="font-label-caps text-label-caps text-primary mb-2">Mentorship</h4>
                <p className="text-sm text-secondary">
                  Guiding underprivileged students through technical basics and career paths in IT.
                </p>
              </div>
            </div>
          </div>

          {/* Volunteering image */}
          <div className="glass-card rounded-2xl overflow-hidden group relative min-h-[250px]">
            <Image
              src={VOLUNTEERING_IMAGE}
              alt="Students engaged in a technology workshop"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>

      {/* ─── Leadership & Accolades ─── */}
      <div className="space-y-12">
        <h2 className="font-headline-lg text-headline-lg text-starlight-white text-center">
          Leadership &amp; Accolades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {CERTS.map((cert) => (
            <div
              key={cert.id}
              className={`glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors flex flex-col justify-between ${cert.span === 2 ? 'md:col-span-2' : ''
                }`}
            >
              <div>
                <span
                  className={`material-symbols-outlined text-3xl mb-4 block ${cert.iconColor}`}
                >
                  {cert.icon}
                </span>
                {cert.tags ? (
                  <>
                    <h3 className="font-headline-md text-headline-md">{cert.value}</h3>
                    <p className="font-body-md text-secondary mt-2">
                      National Service Scheme leadership at Mithibai College, leading a brigade of
                      100+ volunteers for social causes.
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="font-label-caps text-label-caps text-secondary">{cert.label}</h4>
                    <p className="font-body-md text-starlight-white font-bold mt-2">{cert.value}</p>
                  </>
                )}
              </div>
              {cert.tags && (
                <div className="flex gap-2 mt-6">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-caps text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Celestial Observations Gallery ─── */}
      <div className="space-y-12" id="astronomy-gallery">
        <div className="text-center space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-starlight-white">
            Celestial Observations
          </h2>
          <p className="font-body-md text-secondary max-w-2xl mx-auto">
            Capturing the photons that traveled millions of years to reach my lens. A study of
            deep-space objects through the telescopic eye.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="float-gallery-item rounded-2xl overflow-hidden aspect-square group relative"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <p className="font-label-caps text-label-caps text-primary">{item.caption}</p>
                <p className="text-xs text-secondary mt-1">{item.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Stargazing CTA ─── */}
      <div className="glass-card rounded-3xl p-12 relative overflow-hidden text-center max-w-4xl mx-auto border border-nebula-purple/30">
        {/* Decorative orbit rings */}
        <div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] border border-nebula-purple/10 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            animation: 'spin 20s linear infinite',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-nebula-purple/20 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            animation: 'spin 15s linear infinite reverse',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-6">
          <h3 className="font-headline-lg text-headline-lg">
            Interested in a Stargazing Session?
          </h3>
          <p className="font-body-md text-secondary">
            I frequently host informal sessions to explain the night sky. Whether you&apos;re a
            beginner or a fellow enthusiast, let&apos;s connect and explore the stars together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:ilasariyadeep13@gmail.com?subject=Stargazing Session Request"
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps flex items-center gap-2 hover:shadow-[0_0_20px_rgba(211,187,255,0.4)] transition-all"
            >
              Schedule a Session
              <span className="material-symbols-outlined text-sm">event</span>
            </a>
            <Link
              href="https://www.arceducators.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-outline px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-white/5 transition-all text-secondary hover:text-starlight-white"
            >
              Inquire about ARC Workshops
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
