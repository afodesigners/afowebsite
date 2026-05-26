import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const STATS = [
  { v: '12+', l: 'Brands shipped' },
  { v: '4yr', l: 'In studio' },
  { v: '100%', l: 'Founder-led' },
  { v: '∞', l: 'Caffeine' },
]

// "What we believe" — kept dark to match the rest of the site.
// The single inverted (light) moment now lives in the CTA section.
export function LightShowcase() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-belief-bg]',
        { borderRadius: '40px', scale: 0.97, y: 50 },
        {
          borderRadius: '0px',
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.5,
          },
        },
      )

      gsap.fromTo(
        '[data-belief-line]',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '[data-belief-h]',
            start: 'top 75%',
          },
        },
      )

      gsap.from('[data-stat]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-stats]',
          start: 'top 85%',
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative">
      <div
        data-belief-bg
        className="relative bg-ink text-bone overflow-hidden grain"
        style={{ minHeight: '100vh' }}
      >
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 py-28 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14 lg:mb-20">
            <div className="lg:col-span-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-bone/50">
              <span className="font-mono">(03)</span>
              <span className="block w-8 h-px bg-bone/30" />
              What we believe
            </div>
          </div>

          {/* Headline — refined sans, line-stacked */}
          <h2
            data-belief-h
            className="font-sans font-light text-[clamp(2.5rem,7vw,7rem)] leading-[1.02] tracking-[-0.025em] max-w-[18ch]"
          >
            <span className="block overflow-hidden pb-[0.35em]">
              <span data-belief-line className="inline-block">
                A small team.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.35em]">
              <span data-belief-line className="inline-block text-bone/45">
                A bigger impact.
              </span>
            </span>
          </h2>

          <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <p className="lg:col-span-6 lg:col-start-1 text-lg lg:text-xl leading-relaxed text-bone/75 max-w-2xl">
              We don't scale by hiring more people — we scale by caring more.
              Every brand we touch gets our full attention, our weird
              obsessions, and a process built for clarity, not committee.
            </p>

            <div
              data-stats
              className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-x-8 gap-y-6"
            >
              {STATS.map((s) => (
                <div
                  data-stat
                  key={s.l}
                  className="border-t border-bone/15 pt-4"
                >
                  <div className="font-sans font-light text-5xl lg:text-6xl tracking-tight">
                    {s.v}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-bone/55">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 lg:mt-32 pt-8 border-t border-bone/12 flex flex-wrap items-end justify-between gap-6">
            <p className="font-sans text-[clamp(1rem,1.6vw,1.5rem)] leading-snug max-w-2xl text-bone/70">
              Purposeful design that delivers genuine impact — beyond the
              aesthetic.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-bone text-ink px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] hover:bg-acid transition-colors duration-300"
            >
              Start a project
              <span className="size-1.5 rounded-full bg-acid group-hover:bg-ink" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
