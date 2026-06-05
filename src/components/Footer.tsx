import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { site } from '../data/site'

export function Footer() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-bigafo]', {
        yPercent: 30,
        opacity: 0.4,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={root}
      className="relative border-t border-bone/10 px-6 lg:px-12 pt-16 pb-10 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          <div className="lg:col-span-5">
            <p className="font-display font-light text-3xl lg:text-4xl leading-tight max-w-md">
              Brands that never stop, deserve a studio that doesn't either.
            </p>
            <p className="mt-6 text-sm text-bone/55">
              {site.longName} — Design Studio · Jakarta
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.3em] text-bone/40 mb-5">
              Studio
            </div>
            <ul className="space-y-2 text-base">
              <li><Link to="/" className="hover:text-acid transition">Home</Link></li>
              <li><Link to="/work" className="hover:text-acid transition">Projects</Link></li>
              <li><Link to="/studio" className="hover:text-acid transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-acid transition">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.3em] text-bone/40 mb-5">
              Social
            </div>
            <ul className="space-y-2 text-base">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-acid transition">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.3em] text-bone/40 mb-5">
              Contact
            </div>
            <a
              href={`mailto:${site.email}`}
              className="text-base hover:text-acid transition"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div
          data-bigafo
          aria-hidden
          className="relative font-display font-medium text-[14vw] leading-[0.9] tracking-[-0.045em] select-none lowercase text-center"
        >
          afteroffice<span className="text-acid">.</span>
        </div>

        <div className="mt-10 pt-6 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-bone/50">
          <span>© {new Date().getFullYear()} {site.longName}. All rights reserved.</span>
          <span className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-acid animate-pulse" />
            Studio open — taking 2 projects this quarter.
          </span>
        </div>

        {/* Asset credits (CC-BY license obligation) */}
        <div className="mt-3 text-[10px] text-bone/35 leading-relaxed">
          3D Moon by{' '}
          <a
            href="https://sketchfab.com/SebastianSosnowski"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-bone/60 hover:underline"
          >
            Sebastian Sosnowski
          </a>
          {' '}—{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-bone/60 hover:underline"
          >
            CC BY 4.0
          </a>
          .
        </div>
      </div>
    </footer>
  )
}
