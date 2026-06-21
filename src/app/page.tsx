import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import GalacticShotsSection from '@/components/sections/GalacticShotsSection'
import AstronomySection from '@/components/sections/AstronomySection'
import ContactSection from '@/components/sections/ContactSection'
import SolarSystemSection from '@/components/sections/SolarSystemSection'

/**
 * Root page — single-scroll portfolio assembling all sections sequentially:
 *   Home → About → Experience → Skills → Galactic Shots → Astronomy → Contact
 *
 * Each section is an id-anchored div enabling smooth-scroll navigation from the Navbar.
 */
export default function HomePage() {
  return (
    <>
      {/* <SolarSystemSection /> */}
      {/* Hero — "AEM Expert by Day, Astronomer by Night" */}
      <HeroSection />

      {/* About — Bio, profile photo, skill badges */}
      <AboutSection />

      {/* Experience — Bento grid, timeline, strategic engagements, technical capabilities */}
      <ExperienceSection />

      {/* Skills — Instrument Panel pill chips */}
      <SkillsSection />

      {/* Galactic Shots — Instagram reel cards linking to @galactic.shots */}
      <GalacticShotsSection />

      {/* Astronomy — Hero, volunteering, accolades, astrophotography gallery, stargazing CTA */}
      <AstronomySection />

      {/* Contact — Star map, system diagnostics, signal composition form */}
      <ContactSection />
    </>
  )
}
