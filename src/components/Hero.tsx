import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { site } from '../data/site'
import { MoonScene } from './MoonScene'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from('[data-hero-row] > *', {
        y: 16,
        opacity: 0,
        duration: 0.9,
        stagger: 0.05,
        delay: 0.15,
      })
        .from(
          '[data-hero-line]',
          {
            yPercent: 110,
            duration: 1.05,
            stagger: 0.08,
          },
          '-=0.5',
        )
        .from(
          '[data-hero-meta] > *',
          { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 },
          '-=0.55',
        )

      // gentle glow drift
      const orb = root.current?.querySelector<HTMLDivElement>('[data-orb]')
      const onMove = (e: MouseEvent) => {
        if (!orb) return
        const x = (e.clientX / window.innerWidth - 0.5) * 30
        const y = (e.clientY / window.innerHeight - 0.5) * 30
        gsap.to(orb, { x, y, duration: 1.4, ease: 'power3.out' })
      }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }, root)

    return () => ctx.revert()
  }, [])

  // Break sentence into lines for staggered mask reveal
  // Punchy two-beat: each sentence (period-terminated) becomes one line.
  const lines = site.heroSentence
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] overflow-hidden flex flex-col justify-end pt-32 pb-24 lg:pb-32 grain"
    >
      {/* Soft moonlight halo — sits behind the moon to give it a glow */}
      <div
        data-orb
        className="pointer-events-none absolute right-[-12%] top-[8%] w-[90vh] h-[90vh] max-w-[95vw] max-h-[95vw] rounded-full opacity-30 blur-[140px]
                   lg:top-[10%]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255,245,220,0.22) 0%, rgba(214,255,61,0.05) 50%, transparent 70%)',
        }}
      />

      {/* 3D moon — drag to rotate. Sits BEHIND text/CTA so they stay readable + clickable. */}
      <MoonScene
        className="absolute z-0
                   left-1/2 top-[3%] -translate-x-1/2 w-[55vh] h-[55vh] max-w-[80vw] max-h-[80vw]
                   lg:left-auto lg:translate-x-0 lg:right-[-2%] lg:top-[12%] lg:w-[75vh] lg:h-[75vh] lg:max-w-[60vw] lg:max-h-[60vw]"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] w-full px-6 lg:px-12 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        {/* Eyebrow row */}
        <div
          data-hero-row
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-14 lg:mb-20 text-[11px] uppercase tracking-[0.25em] text-bone/55"
        >
          <span>{site.yearRange}</span>
          <span className="size-1 rounded-full bg-bone/30" />
          <span>Design Studio</span>
          <span className="size-1 rounded-full bg-bone/30" />
          <span>{site.location}</span>
          <span className="ml-auto hidden md:inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-acid animate-pulse" />
            Open for Q3
          </span>
        </div>

        {/* Headline — short, bold, two-beat */}
        <h1 className="font-sans font-semibold text-[clamp(3.5rem,11vw,11rem)] leading-[1.05] tracking-[-0.035em] text-bone">
          {lines.map((line, i) => (
            <span
              key={i}
              className="block overflow-hidden pr-2 pb-[0.12em]"
            >
              <span data-hero-line className="inline-block will-change-transform">
                {line.replace(/\.$/, '')}
                <span className="text-acid">.</span>
              </span>
            </span>
          ))}
        </h1>

        {/* Meta row */}
        <div
          data-hero-meta
          className="mt-14 lg:mt-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        >
          <p className="max-w-md text-bone/65 text-base lg:text-lg leading-relaxed">
            A small team in Jakarta — partnering with founders who refuse to
            blend in. Clear, collaborative, focused.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="/work"
              className="group inline-flex items-center gap-3 rounded-full border border-bone/15 px-5 py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-bone hover:text-ink transition-colors duration-300"
            >
              See selected work
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 lg:mt-24 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/40">
          <span className="flex items-center gap-3">
            <span className="block w-8 h-px bg-bone/30" />
            Scroll to begin
          </span>
          <span className="hidden md:block tabular-nums">
            00 / 06
          </span>
        </div>
      </div>
    </section>
  )
}

