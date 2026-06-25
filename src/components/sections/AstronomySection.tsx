import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Rocket, ExternalLink, GraduationCap, Medal, BadgeCheck, Award, Users, MapPin, Camera } from 'lucide-react'
import type { GalleryItem, CertCard } from '@/types'

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'river-trails',
    src: '/images/celestial-1.webp',
    alt: 'Milky Way over Spiti River Valley, Kaza',
    caption: 'Spiti River Trails',
    location: 'Spiti River Valley, Kaza',
    meta: 'Sony Alpha | 20mm | f/1.8 | 20s | ISO 3200',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'key-monastery',
    src: '/images/celestial-2.webp',
    alt: 'Milky Way behind tree near Key Monastery, Spiti',
    caption: 'Milky Way over Key Monastery',
    location: 'Key Monastery Outskirts, Spiti',
    meta: 'Sony Alpha | 24mm | f/2.8 | 15s | ISO 6400',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'langza-buddha',
    src: '/images/celestial-3.webp',
    alt: 'Langza Buddha Statue under the Milky Way',
    caption: 'Langza Buddha Statue',
    location: 'Langza Village, Spiti',
    meta: 'Sony Alpha | 14mm | f/2.8 | 25s | ISO 3200',
    aspectClass: 'aspect-[3/4]',
  },
]

const CERTS: Array<{
  id: string
  label: string
  value: string
  subtitle: string
  date?: string
  span?: number
  iconColor: string
  IconComponent: React.ElementType
  link?: string
}> = [
    {
      id: 'adobe',
      label: 'ADOBE CERTIFIED',
      value: 'AEM Sites Business Practitioner',
      subtitle: 'Adobe Experience Manager - Expert Level',
      date: 'Issued May 2023 · Valid May 2028',
      span: 2,
      iconColor: 'text-cosmic-teal',
      IconComponent: BadgeCheck,
      link: 'https://certification.adobe.com/credential/verify/f4b994d6-55cc-11f0-9b2a-42010a400fc3',
    },
    {
      id: 'jhu-web',
      label: 'JOHNS HOPKINS',
      value: 'HTML, CSS & JavaScript',
      subtitle: 'Coursera - Johns Hopkins University',
      iconColor: 'text-primary',
      IconComponent: Award,
    },
    {
      id: 'jhu-ds',
      label: 'JOHNS HOPKINS',
      value: 'R Programming & Data Science Toolbox',
      subtitle: 'Coursera - Johns Hopkins University',
      iconColor: 'text-cosmic-teal',
      IconComponent: Award,
    },
    {
      id: 'nss',
      label: 'LEADERSHIP',
      value: 'NSS Head of Department (2019–2020)',
      subtitle: 'Led 100+ volunteers, University of Mumbai',
      iconColor: 'text-primary',
      IconComponent: Medal,
    },
    {
      id: 'ltc',
      label: 'LTC',
      value: 'Leadership Training Camp',
      subtitle: 'University of Mumbai - NSS Division',
      iconColor: 'text-nebula-purple',
      IconComponent: Users,
    },
    {
      id: 'idf',
      label: 'IDF',
      value: 'Student Leadership Programme',
      subtitle: 'Indian Development Foundation',
      span: 2,
      iconColor: 'text-cosmic-teal',
      IconComponent: Users,
    },
  ]

const VOLUNTEERING_IMAGE = '/images/volunteering-at-arc.webp'

export default function AstronomySection() {
  return (
    <section
      id="astronomy"
      className="py-24 px-gutter max-w-container-max mx-auto space-y-24"
      data-seo-keywords="astronomy volunteer Mumbai, ARC Educators, ISRO certified astronomy, astrocamp telescope operator, space science outreach India, stargazing Mumbai"
    >
      {/* ─── Astronomy Hero ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[400px]">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nebula-purple/20 border border-nebula-purple/40">
            <Sparkles className="text-primary w-4 h-4" />
            <span className="font-label-caps text-label-caps text-primary">Scientific Explorer</span>
          </div>

          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-starlight-white leading-tight">
            Gazing into the{' '}
            <span className="text-primary">Cosmic Void.</span>
          </h2>

          <p className="font-body-lg text-body-lg text-secondary leading-relaxed max-w-lg">
            Beyond enterprise CMS and workflow automation lies a passion for the infinite.
            Astrophotography demands the same precision and patience as production deployments - long exposures,
            zero room for error, and the reward of seeing something extraordinary emerge from the dark.
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
              <Rocket className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          {/* Hero card showing Gazing into the Cosmic Void image */}
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-nebula-purple/30 group">
            <Image
              src="/images/gazing-into-the-cosmic-void.webp"
              alt="Gazing into the Cosmic Void"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>

      {/* ─── Volunteering ─── */}
      <div
        className="space-y-12"
        id="volunteering"
        data-seo-keywords="astronomy volunteer Mumbai, ARC Educators, ISRO certified astronomy, astrocamp telescope operator, space science outreach India, stargazing Mumbai"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-starlight-white">
              Volunteering at ARC Educators
            </h2>
          </div>
          <Link
            href="https://www.arceducators.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-caps text-label-caps text-primary hover:underline flex items-center gap-2"
          >
            Learn About ARC Educators
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main volunteering card */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 space-y-6 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="text-primary w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-headline-md text-headline-md text-starlight-white leading-tight">
                    Volunteering at ARC Educators
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-deep-navy/20 border border-nebula-purple/20 rounded-full font-label-md text-starlight-white text-xs w-fit">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    ISRO Certified Organisation
                  </div>
                </div>
              </div>
              <p className="font-body-md text-body-md text-secondary">
                ARC Educators is an ISRO-certified astronomy outreach organisation dedicated to making space science accessible to everyone. Since July 2023, I have been volunteering as a telescope operator and sky guide at astrocamps across Mumbai. I set up equipment, help visitors locate and identify celestial objects, and explain the science behind what they see in real time.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-void-black/40 rounded-xl border border-outline-variant/10 flex flex-col h-full">
                <h4 className="font-label-caps text-label-caps text-primary mb-2">
                  Telescope Operations
                </h4>
                <p className="text-sm text-secondary flex-grow">
                  Setting up and operating telescopes at astrocamps, calibrating equipment, and guiding visitors through live views of planets, star clusters, nebulae, and deep sky objects.
                </p>
              </div>
              <div className="p-4 bg-void-black/40 rounded-xl border border-outline-variant/10 flex flex-col h-full">
                <h4 className="font-label-caps text-label-caps text-primary mb-2">
                  Sky Education
                </h4>
                <p className="text-sm text-secondary flex-grow">
                  Answering visitor questions and explaining astronomical concepts during live telescope viewings. Sharing insights on planets, constellations, and the scale of the universe in real time.
                </p>
              </div>
              <div className="p-4 bg-void-black/40 rounded-xl border border-outline-variant/10 flex flex-col h-full">
                <h4 className="font-label-caps text-label-caps text-primary mb-2">
                  Outreach Since
                </h4>
                <p className="text-sm text-secondary flex-grow">
                  July 2023 to Present. 2 plus years contributing to ARC Educators mission of science literacy and astronomy awareness across India.
                </p>
              </div>
            </div>
          </div>

          {/* Volunteering image */}
          <div className="glass-card rounded-2xl overflow-hidden group relative aspect-square w-full">
            <Image
              src={VOLUNTEERING_IMAGE}
              alt="Volunteering at ARC Educators - telescope operation and sky guiding"
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
              className={`glass-card p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 flex flex-col justify-between ${cert.span === 2 ? 'md:col-span-2' : ''
                }`}
            >
              <div>
                <cert.IconComponent className={`w-8 h-8 mb-4 block ${cert.iconColor}`} />
                <h4 className="font-label-caps text-label-caps text-primary mb-2">{cert.label}</h4>
                <h3 className="font-headline-md text-headline-md text-starlight-white mb-2">{cert.value}</h3>
                <p className="font-body-md text-secondary leading-relaxed">{cert.subtitle}</p>
              </div>
              {(cert.date || cert.link) && (
                <div className="mt-4 pt-4 border-t border-white/5 font-label-md text-secondary-fixed-dim text-xs flex justify-between items-center gap-4">
                  <span>{cert.date || ''}</span>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 font-label-caps text-[10px] tracking-wider shrink-0"
                    >
                      Verify Badge
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
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
            Capturing the photons that traveled millions of years to reach my lens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 group flex flex-col shadow-xl"
            >
              {/* Image Container with natural aspect ratio */}
              <div className={`relative w-full ${item.aspectClass} overflow-hidden bg-void-black/20`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Text Block below the image */}
              <div className="p-5 space-y-3 bg-slate-950/40 backdrop-blur-md border-t border-white/5 flex-grow">
                <h4 className="font-headline-sm text-starlight-white text-base font-bold tracking-wide group-hover:text-primary transition-colors">
                  {item.caption}
                </h4>

                <div className="space-y-2 text-xs text-secondary-fixed-dim">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-cosmic-teal shrink-0" />
                    <span className="font-mono">{item.meta}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
