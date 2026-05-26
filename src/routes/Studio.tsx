import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useMagnetic } from '../hooks/useMagnetic'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Marquee } from '../components/Marquee'
import { site, team, principles, values } from '../data/site'

export default function Studio() {
  useSmoothScroll()
  const root = useRef<HTMLElement>(null)
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3)

  useEffect(() => {
    document.title = `Studio · AFO® After Office`
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from('[data-studio-eyebrow] > *', {
        y: 14,
        opacity: 0,
        duration: 0.9,
        stagger: 0.06,
        delay: 0.15,
        ease: 'expo.out',
      })
      gsap.from('[data-studio-h] [data-line]', {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.08,
        delay: 0.2,
        ease: 'expo.out',
      })
      gsap.from('[data-studio-sub]', {
        opacity: 0,
        y: 22,
        duration: 0.9,
        delay: 0.5,
        ease: 'expo.out',
      })

      // Word-scrub statement
      gsap.fromTo(
        '[data-philosophy-word]',
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-philosophy]',
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )

      // Sections
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el.children, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const philosophy =
    'We connect strategy, design, and engineering under one roof so the work compounds. Every project leaves the studio sharper than it arrived.'
  const philosophyWords = philosophy.split(' ')

  return (
    <main ref={root} className="relative">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden flex flex-col justify-end pt-32 pb-20 lg:pb-28 px-6 lg:px-12 grain">
        {/* soft halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[20%] -left-[10%] w-[80vh] h-[80vh] rounded-full opacity-25 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(214,255,61,0.22) 0%, rgba(255,245,220,0.05) 50%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1600px] w-full">
          <div
            data-studio-eyebrow
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-14 lg:mb-20 text-[11px] uppercase tracking-[0.25em] text-bone/55"
          >
            <span>{site.yearRange}</span>
            <span className="size-1 rounded-full bg-bone/30" />
            <span>The Studio</span>
            <span className="size-1 rounded-full bg-bone/30" />
            <span>{site.location}</span>
            <span className="ml-auto hidden md:inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-acid animate-pulse" />
              Open for Q3
            </span>
          </div>

          <h1
            data-studio-h
            className="font-sans font-semibold text-[clamp(3rem,11vw,11rem)] leading-[1.05] tracking-[-0.035em]"
          >
            <span className="block overflow-hidden pr-2 pb-[0.1em]">
              <span data-line className="inline-block will-change-transform">
                We are
              </span>
            </span>
            <span className="block overflow-hidden pr-2 pb-[0.1em]">
              <span data-line className="inline-block will-change-transform">
                {site.name}
                <span className="text-acid">{site.mark}</span>
              </span>
            </span>
          </h1>

          <p
            data-studio-sub
            className="mt-14 lg:mt-20 max-w-xl text-bone/65 text-base lg:text-lg leading-relaxed"
          >
            A small studio in Jakarta partnering with founders who refuse to
            blend in. We shape brand, product, and motion with the same hand —
            so the work feels inevitable, not assembled.
          </p>

          <div className="mt-14 lg:mt-20 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/40">
            <span className="inline-flex items-center gap-2">
              <span className="block w-8 h-px bg-bone/30" />
              Scroll to read
            </span>
            <span className="hidden md:block font-mono tabular-nums">
              01 / 04
            </span>
          </div>
        </div>
      </section>

      {/* Values marquee */}
      <div className="py-6 lg:py-8 border-y border-bone/10 text-sm uppercase tracking-[0.3em] text-bone/40">
        <Marquee items={values} speed={40} />
      </div>

      {/* PHILOSOPHY */}
      <section
        data-philosophy
        className="px-6 lg:px-12 py-28 lg:py-44 mx-auto max-w-[1600px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 lg:mb-20">
          <div className="lg:col-span-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-bone/45">
            <span className="font-mono">(02)</span>
            <span className="block w-8 h-px bg-bone/30" />
            What we believe
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 lg:col-start-2">
            <p className="font-sans font-light text-[clamp(1.7rem,3.4vw,3.5rem)] leading-[1.15] tracking-[-0.015em] text-balance max-w-[28ch]">
              {philosophyWords.map((w, i) => (
                <span
                  key={i}
                  data-philosophy-word
                  className="inline-block mr-[0.22em] will-change-[opacity]"
                >
                  {w}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section
        data-reveal
        className="px-6 lg:px-12 py-28 lg:py-40 mx-auto max-w-[1600px]"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.3em] text-bone/45">
              <span className="font-mono">(03)</span>
              <span className="block w-8 h-px bg-bone/30" />
              Three principles
            </div>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[1] tracking-[-0.02em]">
              How we work<span className="text-acid">.</span>
            </h2>
          </div>
          <p className="max-w-md text-bone/60 text-base lg:text-lg leading-relaxed">
            Three quiet rules we go back to whenever a decision feels noisy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bone/10 rounded-2xl overflow-hidden">
          {principles.map((p) => (
            <article
              key={p.tag}
              className="group relative bg-ink p-10 lg:p-12 transition-colors duration-500 hover:bg-bone/[0.04]"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-sm text-acid">{p.tag}</span>
              </div>
              <h3 className="mt-14 lg:mt-20 font-display font-light text-3xl lg:text-4xl leading-[1.05] tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="mt-5 text-bone/65 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section
        data-reveal
        className="px-6 lg:px-12 py-28 lg:py-40 mx-auto max-w-[1600px]"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.3em] text-bone/45">
              <span className="font-mono">(04)</span>
              <span className="block w-8 h-px bg-bone/30" />
              The room
            </div>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,6rem)] leading-[1] tracking-[-0.02em]">
              Small team,
              <br />
              senior hands<span className="text-acid">.</span>
            </h2>
          </div>
          <p className="max-w-md text-bone/60 text-base lg:text-lg leading-relaxed">
            Six people. Every brief touches a founder, a lead, and a builder —
            no juniors-only stacks, no account layers.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-bone/10 rounded-2xl overflow-hidden">
          {team.map((m) => (
            <li
              key={m.name}
              className="group bg-ink p-8 lg:p-10 transition-colors duration-500 hover:bg-bone/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="size-14 rounded-full bg-bone/[0.06] grid place-items-center font-mono text-sm tracking-wider text-bone/75 group-hover:bg-acid group-hover:text-ink transition-colors duration-500">
                  {m.initials}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-bone/40">
                  Jakarta
                </span>
              </div>
              <div className="mt-10">
                <h3 className="font-display font-light text-2xl tracking-[-0.01em]">
                  {m.name}
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-bone/55">
                  {m.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA — bespoke for Studio */}
      <section className="relative px-6 lg:px-12 py-28 lg:py-44 text-center">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex justify-center items-center gap-3 mb-10 text-[11px] uppercase tracking-[0.3em] text-bone/45">
            <span className="block w-10 h-px bg-bone/30" />
            Have a brief?
            <span className="block w-10 h-px bg-bone/30" />
          </div>
          <h2 className="font-display font-light text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-[-0.03em]">
            Let&apos;s make it
            <br />
            inevitable<span className="text-acid">.</span>
          </h2>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              ref={ctaRef}
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-bone text-ink px-10 py-5 text-sm uppercase tracking-[0.25em] hover:bg-acid transition-colors duration-500 will-change-transform"
            >
              Start a project
              <span className="size-2 rounded-full bg-ink" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
