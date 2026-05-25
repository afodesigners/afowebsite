import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'

const links = [
  { label: 'Index', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Studio', to: '/#studio' },
  { label: 'Contact', to: '/#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 lg:pt-5">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-6 grid grid-cols-3 items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="font-sans text-xl tracking-tight inline-flex items-baseline gap-0.5 w-fit"
          aria-label="AFO home"
        >
          <span className="font-medium">{site.name}</span>
          <span className="text-acid text-[0.7em] -translate-y-1.5">
            {site.mark}
          </span>
        </Link>

        {/* Centered pill nav */}
        <nav
          className={`mx-auto hidden md:flex items-center gap-1 rounded-full border px-1.5 py-1.5 text-[11px] uppercase transition-all duration-500 ${
            scrolled
              ? 'border-bone/15 bg-ink/70 backdrop-blur-xl'
              : 'border-bone/10 bg-bone/[0.02] backdrop-blur-md'
          }`}
        >
          {links.map((l) => {
            const isActive =
              (l.to === '/' && pathname === '/') ||
              (l.to !== '/' && pathname.startsWith(l.to.split('#')[0]) && l.to !== '/#studio' && l.to !== '/#contact')
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-3.5 py-2 rounded-full tracking-[0.22em] transition-colors duration-300 ${
                  isActive
                    ? 'bg-bone text-ink'
                    : 'text-bone/75 hover:text-bone'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="justify-self-end">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-bone/15 bg-ink/40 backdrop-blur-md px-4 py-2 text-[11px] uppercase tracking-[0.22em] hover:bg-bone hover:text-ink transition-colors duration-300"
          >
            <span className="size-1.5 rounded-full bg-acid group-hover:bg-ink transition-colors" />
            Book a call
          </a>
        </div>
      </div>
    </header>
  )
}
