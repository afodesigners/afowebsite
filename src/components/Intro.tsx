import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site, values } from '../data/site'

export function Intro() {
  const root = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // word scrub reveal
      gsap.fromTo(
        '[data-intro-word]',
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-intro-statement]',
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        },
      )

      // marquee
      const track = trackRef.current
      if (track) {
        const half = track.scrollWidth / 2
        gsap.to(track, {
          x: -half,
          duration: half / 55,
          ease: 'none',
          repeat: -1,
        })
      }

      // numbered chip row reveal
      gsap.from('[data-intro-chip]', {
        y: 18,
        opacity: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-intro-chips]',
          start: 'top 85%',
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const words = site.introStatement.split(' ')

  return (
    <section ref={root} id="studio" className="relative">
      {/* thin top marquee */}
      <div className="border-y border-bone/10 py-4 lg:py-5 overflow-hidden text-[11px] uppercase tracking-[0.32em] text-bone/55">
        <div ref={trackRef} className="flex w-max gap-10 will-change-transform">
          {[...values, ...values, ...values].map((v, i) => (
            <span key={i} className="inline-flex items-center gap-10 shrink-0">
              <span>{v}</span>
              <span className="size-1 rounded-full bg-acid/70" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-28 lg:py-44">
        {/* eyebrow row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 lg:mb-24">
          <div className="lg:col-span-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-bone/45">
            <span className="font-mono">(01)</span>
            <span className="block w-8 h-px bg-bone/30" />
            {site.introEyebrow}
          </div>
          <div className="lg:col-span-9 lg:pl-8">
            <p
              data-intro-statement
              className="font-sans font-light text-[clamp(1.5rem,2.6vw,3rem)] leading-[1.25] tracking-[-0.015em] text-balance max-w-[28ch]"
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  data-intro-word
                  className="inline-block mr-[0.22em] will-change-[opacity]"
                >
                  {w}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* chip row */}
        <div
          data-intro-chips
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 lg:mt-20"
        >
          <div className="lg:col-span-3" />
          <div className="lg:col-span-9 lg:pl-8 flex flex-wrap items-center gap-2">
            {[
              'Founder-led',
              'Brand systems',
              'Web · product',
              'Motion · film',
              'Editorial',
              'AI-assisted',
            ].map((c) => (
              <span
                key={c}
                data-intro-chip
                className="inline-flex items-center gap-2 rounded-full border border-bone/12 bg-bone/[0.03] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-bone/70"
              >
                <span className="size-1 rounded-full bg-acid/80" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
