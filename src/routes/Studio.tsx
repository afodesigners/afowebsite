import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useMagnetic } from '../hooks/useMagnetic'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { site, founders, journey } from '../data/site'

/**
 * /studio — About page.
 *
 * Sections:
 *   1. Nav
 *   2. Hero — short description of who AFO is
 *   3. Journey — origin story + milestones timeline
 *   4. Founders — 2-up grid (portrait + name + role + intro + bio + links)
 *   5. Closing CTA
 *   6. Footer
 *
 * Dark theme, generous spacing, editorial typography.
 */
export default function Studio() {
  useSmoothScroll()
  const root = useRef<HTMLElement>(null)
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3)

  useEffect(() => {
    document.title = `About · AFO® After Office`
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-st-hero] > *', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        delay: 0.15,
        ease: 'expo.out',
      })

      gsap.from('[data-st-line]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-st-journey]', start: 'top 78%' },
      })

      gsap.from('[data-st-milestone]', {
        x: -24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-st-milestones]', start: 'top 85%' },
      })

      gsap.utils.toArray<HTMLElement>('[data-st-founder]').forEach((el) => {
        gsap.from(el.querySelectorAll('[data-st-founder-piece]'), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })

      gsap.from('[data-st-closer] > *', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-st-closer]', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={root} className="relative bg-ink text-bone overflow-hidden">
      <Nav />

      {/* HERO ---------------------------------------------------------- */}
      <section className="relative pt-32 lg:pt-44 pb-24 lg:pb-40 px-6 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div data-st-hero>
            <div className="flex items-center gap-3 mb-10 lg:mb-14 text-[11px] uppercase tracking-[0.32em] text-bone/45">
              <span className="font-mono">(00)</span>
              <span className="block w-8 h-px bg-bone/30" />
              About
            </div>

            <h1 className="font-sans font-light text-[clamp(2.5rem,8vw,8rem)] leading-[1] tracking-[-0.03em] max-w-[18ch]">
              A small studio,
              <br />
              built after hours
              <span className="text-acid">.</span>
            </h1>

            <p className="mt-10 lg:mt-14 text-bone/70 text-lg lg:text-2xl leading-relaxed max-w-3xl">
              Two founders, one studio, and a quiet conviction that the work
              gets sharper when the people doing it are close enough to see
              each other's screens. We design and ship a handful of projects a
              quarter — by hand, on purpose, with our names on them.
            </p>
          </div>
        </div>
      </section>

      {/* JOURNEY -------------------------------------------------------- */}
      <section
        data-st-journey
        className="relative px-6 lg:px-12 pb-24 lg:pb-40 border-t border-bone/10 pt-20 lg:pt-32"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="flex items-center gap-3 mb-8 text-[11px] uppercase tracking-[0.3em] text-bone/45">
                  <span className="font-mono">(01)</span>
                  <span className="block w-8 h-px bg-bone/30" />
                  {journey.eyebrow}
                </div>
                <h2 className="font-sans font-light text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.02em] max-w-[12ch]">
                  {journey.lead}
                </h2>
              </div>
            </div>

            {/* Story paragraphs */}
            <div className="lg:col-span-8 space-y-8 lg:space-y-10">
              {journey.story.map((para, i) => (
                <p
                  key={i}
                  data-st-line
                  className="text-bone/80 text-lg lg:text-2xl leading-[1.45] font-light max-w-3xl"
                >
                  {para}
                </p>
              ))}

              {/* Milestones */}
              <div
                data-st-milestones
                className="mt-14 lg:mt-20 pt-10 lg:pt-14 border-t border-bone/10 space-y-5"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-bone/45 mb-6">
                  Milestones
                </div>
                {journey.milestones.map((m) => (
                  <div
                    key={m.year}
                    data-st-milestone
                    className="flex items-baseline gap-6 lg:gap-10 border-b border-bone/8 pb-5"
                  >
                    <span className="font-mono text-bone/45 text-sm w-16 shrink-0">
                      {m.year}
                    </span>
                    <span className="text-bone/85 text-base lg:text-lg leading-relaxed">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS ------------------------------------------------------- */}
      <section className="relative px-6 lg:px-12 pb-24 lg:pb-40 border-t border-bone/10 pt-20 lg:pt-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center gap-3 mb-10 lg:mb-16 text-[11px] uppercase tracking-[0.3em] text-bone/45">
            <span className="font-mono">(02)</span>
            <span className="block w-8 h-px bg-bone/30" />
            Who we are
          </div>

          <div className="max-w-3xl mb-16 lg:mb-24">
            <h2 className="font-sans font-light text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.02em]">
              Two people, no titles theater
              <span className="text-acid">.</span>
            </h2>
            <p className="mt-6 text-bone/70 text-base lg:text-lg leading-relaxed">
              Every project at AFO touches both of us. We don't hand work off
              between juniors and reviewers. You ship with the people who
              pitched you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:gap-10 max-w-3xl">
            {founders.map((f) => (
              <article
                key={f.name}
                data-st-founder
                className="group relative flex flex-col"
              >
                {/* Portrait */}
                <div
                  data-st-founder-piece
                  className="relative aspect-[4/5] w-full max-w-[220px] lg:max-w-[260px] rounded-2xl overflow-hidden bg-bone/[0.04] mb-5 lg:mb-6"
                >
                  <img
                    src={f.portrait}
                    alt={f.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.35) 100%), linear-gradient(160deg, ${f.accent ?? '#ffffff'}1A 0%, transparent 50%)`,
                    }}
                  />
                </div>

                {/* Name + role */}
                <div data-st-founder-piece>
                  <h3 className="font-sans font-medium text-xl lg:text-2xl tracking-[-0.015em]">
                    {f.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-bone/55">
                    {f.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER -------------------------------------------------------- */}
      <section className="relative px-6 lg:px-12 pb-32 lg:pb-48 border-t border-bone/10 pt-20 lg:pt-32 text-center">
        <div data-st-closer className="mx-auto max-w-[1100px]">
          <div className="flex items-center justify-center gap-3 mb-10 text-[11px] uppercase tracking-[0.32em] text-bone/45">
            <span className="block w-10 h-px bg-bone/30" />
            What's next
            <span className="block w-10 h-px bg-bone/30" />
          </div>

          <h2 className="font-sans font-light text-[clamp(2.2rem,6vw,5.5rem)] leading-[1] tracking-[-0.02em]">
            If this sounds like a fit, the room is open
            <span className="text-acid">.</span>
          </h2>

          <p className="mt-8 text-bone/65 text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            We're taking two new projects this quarter. Tell us what you're
            building and we'll tell you honestly whether we're the right
            studio for it.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              ref={ctaRef}
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-bone text-ink px-9 py-4 lg:px-10 lg:py-5 text-[11px] lg:text-sm uppercase tracking-[0.25em] hover:bg-acid transition-colors duration-500 will-change-transform"
            >
              Start a project
              <span className="size-1.5 rounded-full bg-ink group-hover:bg-ink" />
            </Link>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] lg:text-sm uppercase tracking-[0.25em] text-bone/65 hover:text-bone underline-offset-8 hover:underline transition"
            >
              or book a 30-minute call ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
