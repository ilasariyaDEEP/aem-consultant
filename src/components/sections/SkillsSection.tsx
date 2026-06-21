import type { SkillChip } from '@/types'

const SKILLS: SkillChip[] = [
  { id: 'aem', label: 'Adobe Experience Manager', isPulsing: true },
  { id: 'html5', label: 'HTML5 Authoring', isPulsing: false },
  { id: 'json', label: 'JSON & RESTful APIs', isPulsing: false },
  { id: 'jira', label: 'Jira Agile', isPulsing: false },
  { id: 'automation', label: 'Content Automation', isPulsing: true },
  { id: 'seo', label: 'SEO Strategy', isPulsing: false },
  { id: 'leadership', label: 'Project Leadership', isPulsing: false },
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
              className="px-6 py-3 bg-deep-navy/20 border border-nebula-purple/20 rounded-full font-label-md text-starlight-white hover:border-primary transition-colors flex items-center gap-2 group"
            >
              <span
                className={`w-2 h-2 bg-primary rounded-full ${
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
