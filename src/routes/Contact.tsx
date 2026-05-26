import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useMagnetic } from '../hooks/useMagnetic'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { site, faqs } from '../data/site'

const BUDGETS = [
  'Under $20k',
  '$20k – $50k',
  '$50k – $100k',
  '$100k+',
  'Not sure yet',
]
const TIMEFRAMES = [
  'this quarter',
  'next quarter',
  'in 6 months',
  'just exploring',
]

export default function Contact() {
  useSmoothScroll()
  const root = useRef<HTMLElement>(null)
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Mad Libs form state
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [budget, setBudget] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [email, setEmail] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Hey ${site.name},

My name is ${name || '—'} and I'm writing from ${company || '—'}.

I'm getting in touch because I'd like to:
${message || '—'}

My budget is roughly ${budget || '—'} and I'd like to start ${timeframe || '—'}.

You can contact me at ${email}.

Looking forward to your reply!
${name}`
    const subject = `New brief — ${name || 'Contact'}${company ? ` (${company})` : ''}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  useEffect(() => {
    document.title = `Contact · AFO® After Office`
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  return (
    <main ref={root} className="relative">
      <Nav />

      {/* MAD-LIBS FORM */}
      <section
        data-reveal
        className="px-6 lg:px-12 pt-36 lg:pt-44 pb-24 lg:pb-32 mx-auto max-w-[1400px]"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-12 lg:mb-20 text-[11px] uppercase tracking-[0.3em] text-bone/45">
          <span className="font-mono">(01)</span>
          <span className="block w-8 h-px bg-bone/30" />
          Write us a note
          <span className="ml-auto inline-flex items-center gap-2 text-bone/55">
            <span className="size-1.5 rounded-full bg-acid animate-pulse" />
            Open for Q3 · replies within 24h
          </span>
        </div>

        <form
          onSubmit={onSubmit}
          className="font-sans font-light text-[clamp(1rem,1.35vw,1.4rem)] leading-[1.85] tracking-[-0.01em] text-bone/55"
        >
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-3">
            <span>Hey {site.name}<span className="text-acid">{site.mark}</span>, my name is</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name *"
              className="rounded-md bg-bone/[0.06] border border-bone/10 hover:border-bone/25 focus:border-acid focus:bg-bone/[0.1] focus:outline-none transition-colors placeholder:text-bone/30 text-bone px-3 py-1 min-w-[10ch] w-[14ch] sm:w-[18ch]"
            />
            <span>and I&apos;m writing from</span>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="rounded-md bg-bone/[0.06] border border-bone/10 hover:border-bone/25 focus:border-acid focus:bg-bone/[0.1] focus:outline-none transition-colors placeholder:text-bone/30 text-bone px-3 py-1 min-w-[10ch] w-[14ch] sm:w-[18ch]"
            />
            <span>.</span>

            <span className="basis-full mt-4">
              I&apos;m getting in touch because I&apos;d like to
            </span>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you're building — site, brand, product, motion. The shorter the better. *"
              className="basis-full rounded-lg bg-bone/[0.06] border border-bone/10 hover:border-bone/25 focus:border-acid focus:bg-bone/[0.1] focus:outline-none transition-colors placeholder:text-bone/30 text-bone p-3 lg:p-4 resize-y leading-[1.55]"
            />

            <span className="mt-4">My budget is roughly</span>
            <span className="relative mt-4">
              <select
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="appearance-none rounded-md bg-bone/[0.06] border border-bone/10 hover:border-bone/25 focus:border-acid focus:bg-bone/[0.1] focus:outline-none transition-colors text-bone px-3 pr-8 py-1 cursor-pointer"
              >
                <option value="" disabled className="bg-ink">
                  Select a budget *
                </option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b} className="bg-ink">
                    {b}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-bone/55 text-xs">
                ▾
              </span>
            </span>
            <span className="mt-4">and I&apos;d like to start</span>
            <span className="relative mt-4">
              <select
                required
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="appearance-none rounded-md bg-bone/[0.06] border border-bone/10 hover:border-bone/25 focus:border-acid focus:bg-bone/[0.1] focus:outline-none transition-colors text-bone px-3 pr-8 py-1 cursor-pointer"
              >
                <option value="" disabled className="bg-ink">
                  Choose a timeframe *
                </option>
                {TIMEFRAMES.map((t) => (
                  <option key={t} value={t} className="bg-ink">
                    {t}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-bone/55 text-xs">
                ▾
              </span>
            </span>
            <span className="mt-4">.</span>

            <span className="basis-full mt-4">You can contact me at</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com *"
              className="rounded-md bg-bone/[0.06] border border-bone/10 hover:border-bone/25 focus:border-acid focus:bg-bone/[0.1] focus:outline-none transition-colors placeholder:text-bone/30 text-bone px-3 py-1 min-w-[14ch] w-[22ch] sm:w-[28ch]"
            />
            <span>.</span>

            <span className="basis-full mt-6 text-bone/65">
              Looking forward to your reply!
            </span>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-10 border-t border-bone/10">
            <p className="text-sm text-bone/45 max-w-md">
              We read every note within 24 hours. Your submission will open
              your mail client with the brief pre-filled.
            </p>
            <button
              type="submit"
              className="group inline-flex items-center gap-3 rounded-full bg-bone text-ink px-8 lg:px-10 py-4 lg:py-5 text-sm uppercase tracking-[0.25em] hover:bg-acid transition-colors duration-500"
            >
              Send the brief
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </form>
      </section>

      {/* CONTACT BLOCKS — alternative ways */}
      <section
        data-reveal
        className="px-6 lg:px-12 py-24 lg:py-32 mx-auto max-w-[1600px]"
      >
        <div className="flex items-center gap-3 mb-12 lg:mb-16 text-[11px] uppercase tracking-[0.3em] text-bone/45">
          <span className="font-mono">(02)</span>
          <span className="block w-8 h-px bg-bone/30" />
          Or reach us directly
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bone/10 rounded-2xl overflow-hidden">
          {/* Email */}
          <a
            href={`mailto:${site.email}`}
            className="group bg-ink p-10 lg:p-12 transition-colors duration-500 hover:bg-bone/[0.04]"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-bone/40">
                Email
              </span>
              <span className="size-9 rounded-full border border-bone/15 grid place-items-center text-sm text-bone/55 group-hover:bg-acid group-hover:border-acid group-hover:text-ink transition-all duration-500">
                ↗
              </span>
            </div>
            <p className="mt-16 lg:mt-24 font-display font-light text-2xl lg:text-3xl tracking-[-0.01em] break-words">
              {site.email}
            </p>
            <p className="mt-3 text-sm text-bone/55">
              For project briefs, partnerships, press.
            </p>
          </a>

          {/* Booking */}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="group bg-ink p-10 lg:p-12 transition-colors duration-500 hover:bg-bone/[0.04]"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-bone/40">
                Book a call
              </span>
              <span className="size-9 rounded-full border border-bone/15 grid place-items-center text-sm text-bone/55 group-hover:bg-acid group-hover:border-acid group-hover:text-ink transition-all duration-500">
                ↗
              </span>
            </div>
            <p className="mt-16 lg:mt-24 font-display font-light text-2xl lg:text-3xl tracking-[-0.01em]">
              30 minutes,
              <br />
              no pitch.
            </p>
            <p className="mt-3 text-sm text-bone/55">
              We&apos;ll listen first, then come back with a fit yes/no.
            </p>
          </a>

        </div>
      </section>

      {/* FAQ */}
      <section
        data-reveal
        className="px-6 lg:px-12 py-28 lg:py-40 mx-auto max-w-[1600px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.3em] text-bone/45">
              <span className="font-mono">(03)</span>
              <span className="block w-8 h-px bg-bone/30" />
              FAQ
            </div>
            <h2 className="font-display font-light text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.02em]">
              Common
              <br />
              questions<span className="text-acid">.</span>
            </h2>
            <p className="mt-6 text-bone/55 text-base leading-relaxed max-w-sm">
              If yours isn&apos;t here, just{' '}
              <a
                href={`mailto:${site.email}`}
                className="text-bone hover:text-acid transition"
              >
                ask us directly
              </a>
              .
            </p>
          </div>

          <ul className="lg:col-span-8 border-t border-bone/10">
            {faqs.map((f, i) => {
              const open = openFaq === i
              return (
                <li key={f.q} className="border-b border-bone/10">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full text-left py-7 lg:py-8 flex items-start gap-6 group"
                  >
                    <span className="font-mono text-xs text-bone/40 mt-1.5 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display font-light text-xl lg:text-2xl tracking-[-0.01em] group-hover:text-acid transition-colors">
                      {f.q}
                    </span>
                    <span
                      className={`mt-1.5 size-8 rounded-full border border-bone/15 grid place-items-center text-sm text-bone/60 transition-all duration-500 ${
                        open
                          ? 'rotate-45 bg-acid border-acid text-ink'
                          : 'group-hover:bg-bone group-hover:text-ink group-hover:border-bone'
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      open
                        ? 'grid-rows-[1fr] opacity-100 pb-7 lg:pb-8'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pl-10 lg:pl-12 max-w-2xl text-bone/65 text-base lg:text-lg leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* CLOSER */}
      <section className="relative px-6 lg:px-12 py-28 lg:py-44 text-center">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex justify-center items-center gap-3 mb-10 text-[11px] uppercase tracking-[0.3em] text-bone/45">
            <span className="block w-10 h-px bg-bone/30" />
            Studio open
            <span className="block w-10 h-px bg-bone/30" />
          </div>
          <h2 className="font-display font-light text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-[-0.03em]">
            Tell us what
            <br />
            you&apos;re building<span className="text-acid">.</span>
          </h2>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              ref={ctaRef}
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-bone text-ink px-10 py-5 text-sm uppercase tracking-[0.25em] hover:bg-acid transition-colors duration-500 will-change-transform"
            >
              Email the studio
              <span className="size-2 rounded-full bg-ink" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
