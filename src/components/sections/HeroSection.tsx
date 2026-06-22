import { ArrowRight, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'

const ExternalSolarSystem = dynamic(() => import('../canvas/ExternalSolarSystem'), {
  ssr: false,
})

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-[90vh] flex flex-col justify-center px-gutter mx-auto relative pt-20 overflow-hidden"
    >
      {/* Nebula atmosphere glow behind hero content */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #4C1D95 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        aria-hidden="true"
      />

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ExternalSolarSystem />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 pointer-events-none">
        <div className="lg:col-span-8">
          {/* Label */}
          <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest hero-badge">
            ADOBE CERTIFIED EXPERT • AEM SOLUTIONS CONSULTANT
          </span>

          {/* Headline */}
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-starlight-white mb-4 leading-tight text-glow">
            AEM Solutions
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cosmic-teal">
              Consultant
            </span>
          </h1>

          {/* Sub-headline */}
          <h2 className="text-xl md:text-2xl font-semibold text-cosmic-teal mb-6 hero-subheadline">
            Delivering Enterprise CMS Excellence - Without Writing a Line of Code
          </h2>

          {/* Description */}
          <p className="font-body-lg text-body-lg text-secondary-fixed-dim max-w-2xl mb-6 hero-body-full">
            With 3+ years of hands-on expertise in Adobe Experience Manager, I specialize
            in enterprise content operations, workflow automation, and multilingual site management at scale.
            From leading 40-member authoring teams to cutting publishing time by 60% through intelligent
            automation, I bridge the gap between business requirements and technical delivery for global enterprise brands.
          </p>

          {/* Mobile-only Description */}
          <p className="mobile-hero-text text-secondary-fixed-dim max-w-2xl mb-6 hidden">
            3+ years delivering enterprise AEM for global brands - automation, multilingual rollouts, and zero code.
          </p>

          {/* Stat & Skills badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pointer-events-auto hero-tags">
            <span className="px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-lg font-label-md font-bold text-xs uppercase tracking-wider hero-tag">
              3+ Years | Enterprise AEM
            </span>
            {['CMS Operations Lead', 'Workflow Automation Expert', 'Multilingual Content Strategist'].map((badge) => (
              <span key={badge} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-secondary-fixed-dim font-label-md text-xs hero-tag">
                {badge}
              </span>
            ))}
          </div>

          {/* CTAs — CSS smooth-scroll handles behavior via html { scroll-behavior: smooth } */}
          <div className="flex flex-wrap gap-4 hero-buttons">
            <a
              href="#experience"
              className="bg-nebula-purple text-starlight-white px-8 py-4 rounded-lg font-headline-md flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(76,29,149,0.4)] pointer-events-auto hero-btn"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#about"
              className="border border-nebula-purple/50 bg-white/5 backdrop-blur-md text-starlight-white px-8 py-4 rounded-lg font-headline-md hover:bg-white/10 transition-all pointer-events-auto hero-btn"
            >
              Read Story
            </a>
          </div>
        </div>

        {/* Right column: The 3D view is now full-screen background, we keep this empty or as a spacer for layout balance */}
        <div className="relative w-full aspect-square max-w-[500px] lg:max-w-none lg:h-[600px] pointer-events-none hidden lg:block">
          {/* The Solar System runs in the background. */}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <a
          href="#about"
          className="flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 bg-void-black/40 backdrop-blur-sm opacity-40 hover:opacity-100 transition-opacity animate-bounce cursor-pointer pointer-events-auto"
          aria-label="Scroll to About section"
        >
          <ChevronDown className="text-primary w-6 h-6" />
        </a>
      </div>
    </section>
  )
}
