import { ArrowRight, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-[90vh] flex flex-col justify-center px-gutter max-w-container-max mx-auto relative pt-20 overflow-hidden"
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-8">
          {/* Label */}
          <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest">
            LEAD WEB CONTENT SPECIALIST • ADOBE CERTIFIED EXPERT
          </span>

          {/* Headline */}
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-starlight-white mb-6 leading-tight text-glow">
            AEM Expert by Day,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cosmic-teal">
              Astronomer by Night
            </span>
          </h1>

          {/* Description */}
          <p className="font-body-lg text-body-lg text-secondary-fixed-dim max-w-2xl mb-10">
            With over 2.7 years of expertise in Adobe Experience Manager (AEM), I specialize
            in orchestrating digital content ecosystems. When the sun sets, I trade the CMS
            dashboard for a telescope, exploring the celestial wonders of the deep space void.
          </p>

          {/* CTAs — CSS smooth-scroll handles behavior via html { scroll-behavior: smooth } */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#experience"
              className="bg-nebula-purple text-starlight-white px-8 py-4 rounded-lg font-headline-md flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(76,29,149,0.4)]"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#about"
              className="border border-nebula-purple/50 bg-white/5 backdrop-blur-md text-starlight-white px-8 py-4 rounded-lg font-headline-md hover:bg-white/10 transition-all"
            >
              Read Story
            </a>
          </div>
        </div>

        {/* Decorative orbit rings column */}
        <div className="lg:col-span-4 hidden lg:flex items-center justify-center relative">
          <div className="relative w-64 h-64">
            <div
              className="absolute inset-0 border border-nebula-purple/20 rounded-full"
              style={{ animation: 'spin 25s linear infinite' }}
            />
            <div
              className="absolute inset-6 border border-nebula-purple/30 rounded-full"
              style={{ animation: 'spin 18s linear infinite reverse' }}
            />
            <div
              className="absolute inset-12 border border-primary/20 rounded-full"
              style={{ animation: 'spin 12s linear infinite' }}
            />
            {/* Central pulsing star */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_20px_rgba(211,187,255,0.8)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <ChevronDown className="text-primary w-6 h-6" />
      </div>
    </section>
  )
}
