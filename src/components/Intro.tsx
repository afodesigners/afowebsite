import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

/**
 * Intro — a single centered statement whose words brighten as you scroll
 * past. No surrounding assets, eyebrow, or marquee: the copy is the only
 * thing on screen, so the reader's full attention lands on the message.
 */
export function Intro() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-intro-word]',
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-intro-statement]',
            start: 'top 78%',
            end: 'bottom 62%',
            scrub: 0.6,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  const words = site.introStatement.split(' ')

  return (
    <section
      ref={root}
      id="studio"
      className="relative min-h-[80vh] flex items-center justify-center px-6 lg:px-12 py-32 lg:py-52"
    >
      <p
        data-intro-statement
        className="font-sans font-light text-center text-[clamp(1.75rem,4.5vw,4.5rem)] leading-[1.25] tracking-[-0.02em] text-balance max-w-[20ch] lg:max-w-[24ch]"
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
    </section>
  )
}
