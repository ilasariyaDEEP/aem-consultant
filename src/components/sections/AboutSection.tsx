import Image from 'next/image'
import { Wand2, Users, Rocket } from 'lucide-react'
import type { AboutBadge } from '@/types'

const BADGES: (AboutBadge & { IconComponent: React.ElementType })[] = [
  { id: 'cms-operations-lead', icon: 'groups', label: 'CMS Operations Lead', IconComponent: Users },
  { id: 'automation-builder', icon: 'rocket_launch', label: 'Automation Builder', IconComponent: Rocket },
  { id: 'enterprise-delivery', icon: 'auto_fix_high', label: 'Enterprise Delivery', IconComponent: Wand2 },
]

const PROFILE_IMAGE_URL = '/images/deep-ilasariya.webp'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 px-gutter max-w-container-max mx-auto border-t border-white/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile image column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <div className="relative profile-container group">
            {/* Aura glow */}
            <div className="profile-aura" aria-hidden="true" />

            {/* Profile Image container */}
            <div className="profile-image-container relative w-[260px] h-[260px] sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-nebula-purple/30 group-hover:scale-105 transition-all duration-500 ease-out z-10">
              <Image
                src={PROFILE_IMAGE_URL}
                alt="Deep Ilasariya - AEM Expert & Astronomer"
                fill
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 384px"
                className="profile-image-el object-cover"
                priority
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-2 sm:-right-4 glass-card px-4 py-2 rounded-xl z-20">
              <span className="font-label-caps text-label-caps text-primary block">3+ Years</span>
              <span className="font-label-md text-label-md text-secondary-fixed-dim">AEM Expertise</span>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="lg:col-span-7">
          <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-6">
            Architecting Digital Experiences at Enterprise Scale
          </h2>

          <div className="space-y-6">
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
              I am an Adobe Certified AEM Sites Business Practitioner with 3+ years of expertise delivering enterprise content management solutions for global brands across banking, insurance, healthcare, and hospitality. My career has been defined by one goal: making large-scale AEM operations faster, leaner, and more reliable - without a single line of code.
            </p>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
              From managing 40+ member authoring teams and coordinating multi-environment deployments to building lightweight automation tools that eliminate hours of manual work, I bring operational intelligence to AEM implementations. I've worked across AEM Sites (on-premise and Cloud Service), Edge Delivery Services, Dynamic Media, Live Copy, Dispatcher, and the full UAT-to-production pipeline.
            </p>

            {/* Badge chips */}
            <div className="flex flex-wrap gap-4 mt-8">
              {BADGES.map(({ id, IconComponent, label }) => (
                <div
                  key={id}
                  className="flex items-center gap-2 px-4 py-2 bg-nebula-purple/10 border border-nebula-purple/30 rounded-lg hover:border-primary/50 transition-colors"
                >
                  <IconComponent className="text-primary w-5 h-5" />
                  <span className="font-label-md text-starlight-white">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
