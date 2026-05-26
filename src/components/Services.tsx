import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { services } from '../data/site'

export function Services() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-service]', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="services" className="relative py-32 lg:py-48 px-6 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.3em] text-bone/40">
              <span className="block w-12 h-px bg-bone/30" />
              Capabilities
            </div>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[1] tracking-[-0.02em]">
              What we do<span className="text-acid">.</span>
            </h2>
          </div>
          <p className="max-w-md text-bone/65 text-base lg:text-lg leading-relaxed">
            Four disciplines, one team. We move between brand, product, and growth
            without the agency handoff tax.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-bone/10 rounded-2xl overflow-hidden">
          {services.map((s) => (
            <article
              key={s.n}
              data-service
              className="group relative bg-ink p-8 lg:p-10 transition-colors duration-500 hover:bg-bone/[0.04]"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-sm text-bone/40">{s.n}</span>
              </div>
              <h3 className="mt-14 lg:mt-20 font-display font-light text-2xl lg:text-3xl leading-[1.1] tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-4 text-bone/65 text-sm lg:text-base leading-relaxed">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
