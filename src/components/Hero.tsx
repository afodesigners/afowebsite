import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { site } from '../data/site'
import { MoonScene } from './MoonScene'

const LEAD = site.heroHeadlineLead // "Turn Ideas."
const ACCENT = site.heroHeadlineAccent // "Into Impact."
const FULL = `${LEAD} ${ACCENT}`

/** Blinking typewriter caret. Solid while typing, blinks once done. */
function Caret({ done }: { done: boolean }) {
  return (
    <span
      className={`inline-block align-baseline w-[0.06em] h-[0.78em] translate-y-[0.04em] ml-[0.05em] ${
        done ? 'bg-acid animate-[caret_1s_steps(1)_infinite]' : 'bg-bone'
      }`}
    />
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  // How many characters of FULL are currently revealed.
  const [typed, setTyped] = useState(0)
  const [done, setDone] = useState(false)

  // Typewriter — types FULL one char at a time, then leaves a blinking cursor.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setTyped(FULL.length)
      setDone(true)
      return
    }

    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const startDelay = 450

    const tick = () => {
      i += 1
      setTyped(i)
      if (i >= FULL.length) {
        setDone(true)
        return
      }
      // Natural rhythm: slight pause after the first clause's period.
      const justTypedPeriod = FULL[i - 1] === '.'
      const delay = justTypedPeriod ? 360 : 52 + Math.random() * 40
      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, startDelay)
    return () => clearTimeout(timer)
  }, [])

  // Gentle scroll-to-begin reveal + glow drift
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-scroll]', {
        opacity: 0,
        y: 16,
        duration: 0.9,
        delay: 1.1,
        ease: 'expo.out',
      })

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

  // Split the revealed text into the bone lead and the acid accent.
  const leadVisible = FULL.slice(0, Math.min(typed, LEAD.length))
  const leadDone = typed >= LEAD.length
  const accentVisible =
    typed > LEAD.length ? FULL.slice(LEAD.length, typed).replace(/^\s+/, '') : ''

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] overflow-hidden flex flex-col justify-center pt-32 pb-28 lg:pb-32 grain"
    >
      {/* Soft moonlight halo */}
      <div
        data-orb
        className="pointer-events-none absolute right-[-12%] top-[8%] w-[90vh] h-[90vh] max-w-[95vw] max-h-[95vw] rounded-full opacity-30 blur-[140px] lg:top-[10%]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255,245,220,0.22) 0%, rgba(214,255,61,0.05) 50%, transparent 70%)',
        }}
      />

      {/* Visual hook — draggable moon, behind the headline */}
      <MoonScene
        className="absolute z-0
                   left-1/2 top-[3%] -translate-x-1/2 w-[55vh] h-[55vh] max-w-[80vw] max-h-[80vw]
                   lg:left-auto lg:translate-x-0 lg:right-[-2%] lg:top-[12%] lg:w-[75vh] lg:h-[75vh] lg:max-w-[60vw] lg:max-h-[60vw]"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] w-full px-6 lg:px-12 pointer-events-none [&_a]:pointer-events-auto">
        {/* Typed headline — two clean beats: bone lead, acid accent */}
        <h1 className="font-sans font-semibold text-[clamp(3rem,9.5vw,9.5rem)] leading-[1.04] tracking-[-0.035em] text-bone max-w-[12ch]">
          <span className="sr-only">{FULL}</span>

          {/* Line 1 — lead (bone) */}
          <span aria-hidden className="block min-h-[1.04em]">
            {leadVisible}
            {!leadDone && <Caret done={false} />}
          </span>

          {/* Line 2 — accent (acid) */}
          <span aria-hidden className="block min-h-[1.04em] text-acid">
            {accentVisible}
            {leadDone && <Caret done={done} />}
          </span>
        </h1>

        {/* Description — fades in once the headline finishes typing */}
        <p
          className={`mt-7 lg:mt-9 max-w-[44ch] text-bone/65 text-base lg:text-xl leading-relaxed transition-all duration-700 ease-out ${
            done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {site.heroDescription}
        </p>
      </div>

      {/* Scroll to begin — moved to bottom center */}
      <div
        data-hero-scroll
        className="absolute bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-bone/45"
      >
        <span>Scroll to begin</span>
        <span className="block w-px h-8 bg-gradient-to-b from-bone/40 to-transparent animate-[scrollcue_1.8s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes caret { 0%,50% { opacity: 1 } 50.01%,100% { opacity: 0 } }
        @keyframes scrollcue {
          0% { transform: scaleY(0.3); transform-origin: top; opacity: 0.3 }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1 }
          100% { transform: scaleY(0.3); transform-origin: bottom; opacity: 0.3 }
        }
      `}</style>
    </section>
  )
}
