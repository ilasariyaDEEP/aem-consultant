const AEM_CORE_SKILLS = [
  'Adobe Experience Manager (AEM Sites)',
  'AEM as a Cloud Service',
  'Edge Delivery Services (EDS / Franklin)',
  'Content Fragment Modeling & Automation',
  'Experience Fragment Architecture',
  'Dynamic Media & DAM',
  'ACS Commons Automation',
  'Package Deployment (DEV → UAT → Stage → Prod)',
  'Dispatcher Configuration & CDN Basics',
]

const CONTENT_STRATEGY_SKILLS = [
  'Multilingual Content Management',
  'Live Copy & Blueprint Structures',
  'Language Copy & i18n',
  'SEO Tag Management & Structured Content',
  'WCAG Accessibility Standards',
  'JSON Authoring',
  'AEM Guides (XML Authoring - basics)',
  'Headless CMS Concepts',
]

const OPERATIONS_TOOLS_SKILLS = [
  'Jira - Agile Project Coordination',
  'Stakeholder Requirement Gathering',
  'Dev Ticket Creation & QA Verification',
  'App Scripts & Excel Automation',
  'Team Operations (40+ member teams)',
  'Leave & Resource Tracking Systems',
  'ProofHub Project Management',
  'Cross-functional Delivery Coordination',
]

function SkillPill({ label }: { label: string }) {
  return (
    <div className="px-5 py-2.5 bg-deep-navy/40 border border-nebula-purple/30 rounded-full font-label-md text-xs text-starlight-white hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2 whitespace-nowrap backdrop-blur-xs select-none">
      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary shadow-[0_0_8px_rgba(211,187,255,0.8)]" />
      {label}
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden"
    >
      <div className="px-gutter max-w-container-max mx-auto mb-12">
        <div className="text-center">
          <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-4">
            Instrument Panel
          </h2>
          <p className="text-secondary max-w-xl mx-auto">
            The core technologies, architectures, and methodologies powering my professional trajectory.
          </p>
        </div>
      </div>

      {/* Alternate Direction Scrolling Marquees */}
      <div className="flex flex-col gap-1 w-full relative">
        {/* Track 1: AEM Core (Left Scroll) */}
        <div className="marquee-container">
          <div className="marquee-track animate-marquee">
            {AEM_CORE_SKILLS.map((skill, index) => (
              <SkillPill key={`core-1-${index}`} label={skill} />
            ))}
            {AEM_CORE_SKILLS.map((skill, index) => (
              <SkillPill key={`core-2-${index}`} label={skill} />
            ))}
          </div>
        </div>

        {/* Track 2: Content & Strategy (Right Scroll) */}
        <div className="marquee-container">
          <div className="marquee-track animate-marquee-reverse">
            {CONTENT_STRATEGY_SKILLS.map((skill, index) => (
              <SkillPill key={`strategy-1-${index}`} label={skill} />
            ))}
            {CONTENT_STRATEGY_SKILLS.map((skill, index) => (
              <SkillPill key={`strategy-2-${index}`} label={skill} />
            ))}
          </div>
        </div>

        {/* Track 3: Operations & Tools (Left Scroll) */}
        <div className="marquee-container">
          <div className="marquee-track animate-marquee">
            {OPERATIONS_TOOLS_SKILLS.map((skill, index) => (
              <SkillPill key={`ops-1-${index}`} label={skill} />
            ))}
            {OPERATIONS_TOOLS_SKILLS.map((skill, index) => (
              <SkillPill key={`ops-2-${index}`} label={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
