import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../data/site'

export function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-mfword]',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  const words = site.manifesto.split(' ')

  return (
    <section
      ref={root}
      id="studio"
      className="relative py-32 lg:py-56 px-6 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-3 mb-12 text-xs uppercase tracking-[0.3em] text-bone/40">
          <span className="block w-12 h-px bg-bone/30" />
          The Studio
        </div>
        <p className="font-display font-light text-[clamp(2rem,5vw,5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
          {words.map((w, i) => (
            <span
              key={i}
              data-mfword
              className="inline-block mr-[0.25em] will-change-[opacity]"
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
