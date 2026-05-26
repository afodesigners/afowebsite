import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { testimonials } from '../data/site'

/**
 * Inspiring client experiences — auto-scrolling marquee of testimonial
 * cards. Hover the track to pause it; hover any single card to enlarge
 * it while siblings fade and shrink slightly, so the focused quote is
 * the only thing reading at full strength.
 */
export function Testimonials() {
  const root = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-tst-head] > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })

      const track = trackRef.current
      if (!track) return
      // Duplicated content makes the loop seamless — animate to -half.
      const half = track.scrollWidth / 2
      tweenRef.current = gsap.to(track, {
        x: -half,
        duration: half / 28, // ~28px/sec, calm pace
        ease: 'none',
        repeat: -1,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const pause = () => tweenRef.current?.timeScale(0)
  const resume = () => tweenRef.current?.timeScale(1)

  // Render the list twice for the seamless loop.
  const items = [...testimonials, ...testimonials]

  return (
    <section
      ref={root}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Header */}
      <div
        data-tst-head
        className="mx-auto max-w-[1600px] px-6 lg:px-12 mb-16 lg:mb-24"
      >
        <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.3em] text-bone/45">
          <span className="font-mono">(05)</span>
          <span className="block w-8 h-px bg-bone/30" />
          Kind words
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[1] tracking-[-0.02em]">
            Inspiring client
            <br />
            experiences<span className="text-acid">.</span>
          </h2>
          <p className="max-w-sm text-bone/60 text-base lg:text-lg leading-relaxed">
            Join us and become our next success story.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="relative group/track"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          ref={trackRef}
          className="flex gap-5 lg:gap-6 w-max will-change-transform py-8"
        >
          {items.map((t, i) => (
            <article
              key={i}
              className="group/card relative w-[300px] lg:w-[380px] h-[420px] lg:h-[480px] shrink-0
                         rounded-3xl bg-bone text-ink p-8 lg:p-10
                         transition-[transform,opacity,filter] duration-700 ease-out origin-center
                         shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]
                         group-hover/track:opacity-40 group-hover/track:scale-[0.94]
                         group-hover/track:[filter:blur(2px)]
                         hover:!opacity-100 hover:!scale-[1.06] hover:![filter:blur(0)]
                         hover:!z-10"
            >
              {/* Top mark + accent dot */}
              <div className="flex items-start justify-between">
                <span
                  aria-hidden
                  className="font-sans font-light text-5xl lg:text-6xl leading-none text-ink/25 select-none"
                >
                  &ldquo;
                </span>
                <span
                  className="mt-3 size-2 rounded-full"
                  style={{ background: t.accent ?? '#0a0a0a' }}
                />
              </div>

              {/* Quote */}
              <p
                className="mt-6 font-sans font-light text-[1.05rem] lg:text-[1.2rem] leading-[1.4] tracking-[-0.005em]
                           opacity-70 transition-opacity duration-500
                           group-hover/card:opacity-100"
              >
                {t.quote}
              </p>

              {/* Author */}
              <div className="absolute left-8 right-8 bottom-7 lg:bottom-8 flex items-center gap-3 pt-5 border-t border-ink/10">
                <span
                  className="size-10 rounded-full grid place-items-center text-sm font-medium text-ink"
                  style={{
                    background: `${t.accent ?? '#0a0a0a'}30`,
                  }}
                >
                  {t.name[0]}
                </span>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">
                    {t.name}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink/55 truncate">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ''}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-40 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 lg:w-40 bg-gradient-to-l from-ink to-transparent" />
      </div>

      {/* Footnote */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 mt-10 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-bone/40">
        <span>Hover to pause · hover a card to read</span>
        <span className="font-mono tabular-nums">
          {String(testimonials.length).padStart(2, '0')} stories
        </span>
      </div>
    </section>
  )
}
