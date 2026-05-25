import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/site'

export function WorkTeaser() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-teaser-card]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const featured = projects.slice(0, 3)

  return (
    <section ref={root} id="work" className="relative py-20 lg:py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-bone/45">
            <span className="font-mono">(02)</span>
            <span className="block w-8 h-px bg-bone/30" />
            Selected work
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2.5 rounded-full border border-bone/15 px-4 py-2 text-[11px] uppercase tracking-[0.25em] hover:bg-bone hover:text-ink transition-colors duration-300"
          >
            View all ({projects.length})
            <span className="inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/work"
              data-teaser-card
              className="group relative rounded-2xl overflow-hidden border border-bone/8 bg-bone/[0.02] hover:bg-bone/[0.04] transition-colors duration-500"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-ink">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.7) 100%), linear-gradient(160deg, ${p.color}26 0%, transparent 55%)`,
                  }}
                />
                <span
                  aria-hidden
                  className="absolute top-5 left-5 text-[10px] font-mono uppercase tracking-[0.25em] text-bone/80"
                >
                  {String(i + 1).padStart(2, '0')} · {p.year}
                </span>
                <span
                  aria-hidden
                  className="absolute top-5 right-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-bone/80"
                >
                  {p.status === 'In Progress' ? (
                    <>
                      <span className="size-1.5 rounded-full bg-acid animate-pulse" />
                      In Progress
                    </>
                  ) : (
                    <>
                      <span
                        className="size-1.5 rounded-full"
                        style={{ background: p.color }}
                      />
                      {p.category}
                    </>
                  )}
                </span>
              </div>
              <div className="p-5 lg:p-6 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-sans font-medium text-xl lg:text-2xl tracking-[-0.01em] truncate">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-bone/55 truncate">
                    {p.type} · {p.timelineWeeks}w
                  </p>
                </div>
                <span className="size-9 shrink-0 rounded-full border border-bone/15 grid place-items-center text-sm text-bone/60 group-hover:bg-acid group-hover:border-acid group-hover:text-ink transition-all duration-500">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
