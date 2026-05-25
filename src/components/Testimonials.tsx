import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../data/site'

/**
 * Cinematic single-quote testimonials, Arpeggio-style.
 *
 * One large quote is featured at a time. Auto-advances on a 6.5s
 * interval (pauses while the user hovers). Manual prev / next /
 * dots. Crossfade + slight slide on quote change.
 */
export function Testimonials() {
  const root = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6500)
    return () => clearInterval(t)
  }, [paused])

  // Reveal-on-enter for the whole section
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-tst-stage] > *', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // Animate quote on change (crossfade + slight slide)
  useEffect(() => {
    gsap.fromTo(
      '[data-tst-quote]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' },
    )
    gsap.fromTo(
      '[data-tst-author]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'expo.out' },
    )
  }, [index])

  const current = testimonials[index]
  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <section
      ref={root}
      className="relative py-32 lg:py-56 px-6 lg:px-12 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-16 lg:mb-24 text-[11px] uppercase tracking-[0.3em] text-bone/40">
          <span className="font-mono">(05)</span>
          <span className="block w-8 h-px bg-bone/30" />
          Kind words
          <span className="ml-auto font-mono tabular-nums text-bone/55">
            {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>

        {/* Featured quote */}
        <div data-tst-stage className="relative">
          <span
            aria-hidden
            className="absolute -top-12 lg:-top-20 left-0 font-sans font-light text-[clamp(8rem,18vw,22rem)] leading-none text-acid/40 select-none"
          >
            "
          </span>

          <blockquote
            data-tst-quote
            className="relative font-sans font-light text-[clamp(1.6rem,4.2vw,4.5rem)] leading-[1.15] tracking-[-0.015em] text-bone max-w-[20ch] lg:max-w-[24ch]"
          >
            {current.quote}
          </blockquote>

          <figcaption
            data-tst-author
            className="mt-10 lg:mt-16 flex items-center gap-4"
          >
            <span className="size-12 rounded-full bg-bone/10 grid place-items-center font-medium text-base">
              {current.name[0]}
            </span>
            <span>
              <span className="block text-base lg:text-lg font-medium">
                {current.name}
              </span>
              <span className="block text-xs uppercase tracking-[0.22em] text-bone/50">
                {current.role}
              </span>
            </span>
          </figcaption>
        </div>

        {/* Controls */}
        <div className="mt-16 lg:mt-24 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? 'w-10 bg-acid' : 'w-5 bg-bone/20 hover:bg-bone/40'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="group size-11 rounded-full border border-bone/15 grid place-items-center text-bone/70 hover:bg-bone hover:text-ink hover:border-bone transition-colors duration-300"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="group size-11 rounded-full border border-bone/15 grid place-items-center text-bone/70 hover:bg-bone hover:text-ink hover:border-bone transition-colors duration-300"
            >
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
