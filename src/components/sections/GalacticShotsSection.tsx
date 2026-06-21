import Image from 'next/image'
import Link from 'next/link'
import type { ReelCard } from '@/types'

const INSTAGRAM_URL = 'https://www.instagram.com/galactic.shots/'

const REEL_CARDS: ReelCard[] = [
  {
    id: 'andromeda-core',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfB-pFYWUSBa7tyc3C8Vu0tuFwBTnpDdeGVqWvtzM9Xnv9DbkFjs-Tk3z6u-BPx69yVAXR0vbMH2EFZMATKIM-Cm6h3vrtiBHAXi79nV2RS9psokZ5mK2pqER1J84hrTPlwMNiILaJnx8ImrgEQoqYWhX4d_YgaSUdxYpI_6tStsfG3LCJJCCmOXBZLRaWSCkJkCaM-tphJmdJLEy5AINrPYTcT3KHKk8PxhypFVDUvLs3y6SVOXr3HMI7rJmdUnkMG8hpYx5Y84k',
    alt: 'Andromeda Galaxy Core',
    title: 'The Andromeda Core',
    description: 'Capturing the spiral light of our nearest galactic neighbor 2.5 million light-years away.',
    link: INSTAGRAM_URL,
  },
  {
    id: 'pillars-creation',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADZbFAQUN5P9IqWsO_CHqOmMNqMzr09Gc70tPJuRiIws7bkIwhEZYbFxdGbP5k9Le0G-g03STuqnDXdbdomgr_q8crqoVAWIwTNxTFUuOOAC3SFRPUMbwPg5cSN9Cyb1n5wjjzR6ddmUr0eXK6Uun_s52dLIJM-Aznh_2Kb9Fc7Uzu1N7XNwXLb6PWlx6Yo6kBmdE70YVRjlP9RMcI3dv_SXiqIgmfL2r-9G8xI7BSo90l080cS3NyKY_94o1MFJtfj8NLFQZaf0',
    alt: 'Pillars of Creation — Eagle Nebula',
    title: 'Pillars of Creation in 4K',
    description: 'A high-dynamic range composite of the famous stellar nursery in the Eagle Nebula.',
    link: INSTAGRAM_URL,
  },
  {
    id: 'moon-motion',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY8kbfVoDqGXRssRgHSpG7IKxslqeCoFbx1gkczV-1-YnxeD05wXUC3Knd4ZZou4DL_Pn_LOkxYgUtwrav_5M7Y2NzQDkfeZ20eEDXlqv_XWvxb5e4MAz5SJXXDu-Q2Y1vSWCBS_FARkVA8ZU766PIl17lDNQZYPi6XjKFTrXplqdEBmzhXgMBcHDNHAlFLnX2np-IRhMtC2jjMvroxdA7lLn2ImHyabuk00TifqIP-avfmki8oae56-TYBYCiPfiMlnPZSXildOc',
    alt: 'Moon in Motion Timelapse',
    title: 'Moon in Motion',
    description: '48-hour lunar transit timelapse showing the intricate shadows of craters and basins.',
    link: INSTAGRAM_URL,
  },
  {
    id: 'orion-belt',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqT0Jrcerp6vvZlpq61-jnpR-0Qc9FOQeVe4lhbQxwLPTPx0xknlk0cfY4EPhB2B_P3HsTqU9KtAH6caRP7ukwzBJaH7-naeu7CXK9FnWWhvhRl56SuDSpO5ftwiF78wZchFO1Djiied5sB73VZ-llCNkr6VMag3PvNAyGeLTxy3Bypnp2XnkqTTWPy9pc_sDdodQSVcfkV_0JjXsdXrnTAlp9HuGwdLyZxNLfZ5zgP26b6S2PazDrgmiWMslEyPlO1s00t5kj8a4',
    alt: "Orion's Belt Widefield",
    title: "Orion's Belt Widefield",
    description: 'Exploring the dusty regions and red supergiants in the heart of winter\'s constellation.',
    link: INSTAGRAM_URL,
  },
]

export default function GalacticShotsSection() {
  return (
    <section
      id="galactic-shots"
      className="py-24 px-gutter max-w-container-max mx-auto"
    >
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-starlight-white mb-4">
          Galactic Shots
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          A &quot;binge-watch&quot; journey through the deep void. Exploring the cosmos, one
          exposure at a time via{' '}
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @galactic.shots
          </Link>
          .
        </p>
      </div>

      {/* Reel card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REEL_CARDS.map((card) => (
          <Link
            key={card.id}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-xl overflow-hidden group flex flex-col h-full border-0"
          >
            {/* 9:16 reel thumbnail */}
            <div className="aspect-[9/16] bg-void-black/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-60 z-10" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <span className="material-symbols-outlined text-white text-4xl translate-x-0.5">
                    play_arrow
                  </span>
                </div>
              </div>

              {/* Thumbnail image */}
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Card footer */}
            <div className="p-6 flex flex-col flex-grow bg-deep-navy/30">
              <h3 className="font-headline-md text-starlight-white mb-2 text-lg">{card.title}</h3>
              <p className="text-secondary-fixed-dim text-sm mb-4 line-clamp-2">
                {card.description}
              </p>
              <div className="mt-auto flex items-center text-primary font-label-caps text-xs gap-2">
                WATCH REEL
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
