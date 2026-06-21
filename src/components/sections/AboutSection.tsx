import Image from 'next/image'
import { Wand2, Users, Rocket } from 'lucide-react'
import type { AboutBadge } from '@/types'

const BADGES: (AboutBadge & { IconComponent: React.ElementType })[] = [
  { id: 'aem-architect', icon: 'auto_fix_high', label: 'AEM Architect', IconComponent: Wand2 },
  { id: 'team-leader', icon: 'groups', label: 'Team Leader', IconComponent: Users },
  { id: 'automation-expert', icon: 'rocket_launch', label: 'Automation Expert', IconComponent: Rocket },
]

const PROFILE_IMAGE_URL =
  'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000'

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

            {/* Black-hole hover container */}
            <div className="black-hole-container relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-nebula-purple/30 group-hover:scale-105 transition-all duration-500 ease-out z-10">
              {/* Event horizon overlay */}
              <div className="black-hole-event-horizon" aria-hidden="true" />

              <Image
                src={PROFILE_IMAGE_URL}
                alt="Deepkumar Ilasariya — AEM Expert & Astronomer"
                fill
                sizes="(max-width: 768px) 288px, 384px"
                className="black-hole-target object-cover"
                priority
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-xl z-20">
              <span className="font-label-caps text-label-caps text-primary block">2.7+ Years</span>
              <span className="font-label-md text-label-md text-secondary-fixed-dim">AEM Expertise</span>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="lg:col-span-7">
          <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-6">
            Unveiling the Digital Cosmos
          </h2>

          <div className="space-y-6">
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
              I am a dynamic professional with 2.7 years of expertise in Adobe Experience Manager
              (AEM). My journey is defined by orchestrating high-impact digital experiences and
              navigating complex content architectures.
            </p>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
              Combining technical expertise with leadership skills, I strive to drive digital
              excellence in every project I undertake. Whether I&apos;m leading teams through
              large-scale migrations or automating workflows to enhance efficiency, my focus
              remains on delivering pixel-perfect results that scale.
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
