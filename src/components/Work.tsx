import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/site'

export function Work() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // image reveals
      gsap.utils.toArray<HTMLElement>('[data-card]').forEach((card) => {
        const cover = card.querySelector('[data-cover]')
        const media = card.querySelector('[data-media]')
        gsap.fromTo(
          cover,
          { scaleX: 1, transformOrigin: 'right center' },
          {
            scaleX: 0,
            duration: 1.2,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          },
        )
        gsap.fromTo(
          media,
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          },
        )
        gsap.from(card.querySelectorAll('[data-meta] > *'), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="work" className="relative py-24 lg:py-40 px-6 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between mb-16 lg:mb-24">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-bone/40">
            <span className="block w-12 h-px bg-bone/30" />
            Selected Work
          </div>
          <span className="hidden md:block text-sm text-bone/60">
            {String(projects.length).padStart(2, '0')} / projects
          </span>
        </div>

        <div className="space-y-32 lg:space-y-44">
          {projects.map((p, i) => (
            <article
              key={p.id}
              data-card
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <a
                href="#"
                className="relative col-span-1 lg:col-span-8 group overflow-hidden block rounded-2xl"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <div
                    data-media
                    className="absolute inset-0 will-change-transform transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}55 0%, ${p.color}1a 60%, #161616 100%), radial-gradient(circle at 30% 70%, ${p.color}66, transparent 55%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 grid place-items-center"
                    aria-hidden
                  >
                    <span
                      className="font-display text-[clamp(4rem,12vw,16rem)] leading-none opacity-30 mix-blend-overlay"
                      style={{ color: p.color }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div
                    data-cover
                    className="absolute inset-0 bg-ink"
                    style={{ transformOrigin: 'right center' }}
                  />
                </div>

                <div className="absolute top-6 right-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone/70">
                  <span className="size-1.5 rounded-full" style={{ background: p.color }} />
                  {p.category}
                </div>

                <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-bone/10 backdrop-blur px-4 py-2 text-xs uppercase tracking-[0.2em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  View case study →
                </div>
              </a>

              <div data-meta className="col-span-1 lg:col-span-4 lg:pl-8">
                <span className="block text-xs uppercase tracking-[0.3em] text-bone/40">
                  / {p.year}
                </span>
                <h3 className="mt-4 font-display font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-5 text-bone/65 text-base lg:text-lg leading-relaxed">
                  {p.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
