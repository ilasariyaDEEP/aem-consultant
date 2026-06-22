import type { SkillChip } from '@/types'

const SKILLS: SkillChip[] = [
  { id: 'aem', label: 'Adobe Experience Manager (AEM Sites + Cloud)', isPulsing: true },
  { id: 'eds', label: 'Edge Delivery Services (EDS)', isPulsing: true },
  { id: 'cf-ef', label: 'Content Fragment & Experience Fragment', isPulsing: false },
  { id: 'acs-auto', label: 'ACS Commons & Workflow Automation', isPulsing: true },
  { id: 'dynamic-media', label: 'Dynamic Media & DAM', isPulsing: false },
  { id: 'live-copy', label: 'Live Copy / Blueprint / i18n', isPulsing: false },
  { id: 'dispatcher', label: 'Dispatcher & CDN Configuration', isPulsing: false },
  { id: 'json-authoring', label: 'JSON & Structured Content Authoring', isPulsing: false },
  { id: 'jira-stakeholder', label: 'Jira Agile & Stakeholder Management', isPulsing: false },
  { id: 'app-scripts', label: 'App Scripts & Excel Process Automation', isPulsing: false },
  { id: 'seo-wcag', label: 'SEO Strategy & WCAG Compliance', isPulsing: false },
  { id: 'deployment-ops', label: 'Multi-Environment Deployment Operations', isPulsing: true },
]

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 bg-void-black/20 backdrop-blur-sm border-y border-white/5 relative"
    >
      <div className="px-gutter max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-4">
            Instrument Panel
          </h2>
          <p className="text-secondary">
            The core technologies and methodologies powering my professional trajectory.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {SKILLS.map(({ id, label, isPulsing }) => (
            <div
              key={id}
              className="instrument-item panel-item px-6 py-3 bg-deep-navy/20 border border-nebula-purple/20 rounded-full font-label-md text-starlight-white hover:border-primary transition-colors flex items-center gap-2 group"
            >
              <span
                className={`panel-bullet w-2 h-2 bg-primary rounded-full ${
                  isPulsing ? 'animate-pulse' : ''
                }`}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
