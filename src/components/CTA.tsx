import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { site } from '../data/site'
import { useMagnetic } from '../hooks/useMagnetic'

/**
 * "Have a project?" — the bold, simple, single-purpose closer.
 * Dark theme, massive headline, one magnetic CTA. No tricks.
 */
export function CTA() {
  const root = useRef<HTMLElement>(null)
  const btnRef = useMagnetic<HTMLAnchorElement>(0.3)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-cta-word]', {
        yPercent: 110,
        rotate: 4,
        duration: 1.1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      })
      gsap.from('[data-cta-sub], [data-cta-actions]', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-cta-sub]',
          start: 'top 85%',
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="contact"
      className="relative bg-ink text-bone py-32 lg:py-56 px-6 lg:px-12 text-center overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Eyebrow */}
        <div className="flex justify-center items-center gap-3 mb-12 text-[11px] uppercase tracking-[0.32em] text-bone/45">
          <span className="block w-10 h-px bg-bone/30" />
          Let's build
          <span className="block w-10 h-px bg-bone/30" />
        </div>

        {/* Massive headline */}
        <h2 className="font-sans font-light text-[clamp(4rem,15vw,18rem)] leading-[0.88] tracking-[-0.04em] text-balance">
          <span className="block overflow-hidden pb-2">
            <span data-cta-word className="inline-block will-change-transform">
              Have a
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-cta-word className="inline-block will-change-transform">
              project<span className="text-acid">?</span>
            </span>
          </span>
        </h2>

        {/* Subtitle */}
        <p
          data-cta-sub
          className="mt-10 text-bone/65 text-lg lg:text-xl max-w-xl mx-auto"
        >
          We take on a handful of projects each quarter. Tell us what you're
          building — we'll tell you if we're a fit.
        </p>

        {/* Actions */}
        <div
          data-cta-actions
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            ref={btnRef}
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-bone text-ink px-10 py-5 text-sm uppercase tracking-[0.25em] hover:bg-acid transition-colors duration-500 will-change-transform"
          >
            Book a call
            <span className="size-2 rounded-full bg-ink" />
          </a>
        </div>
      </div>
    </section>
  )
}
