import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { projects, site } from '../data/site'

/**
 * /work/:slug — case-study detail page.
 *
 * Layout (top to bottom):
 *   1. Nav
 *   2. Hero    — eyebrow, title, blurb, status row
 *   3. Cover image (full-bleed)
 *   4. Meta + Overview — 2-col grid (key/value | long description)
 *   5. Process — narrative blocks with word-scrub reveals
 *   6. Gallery — stacked images
 *   7. Results + Takeaway
 *   8. Next project
 *   9. Footer
 *
 * Dark theme, Poppins, generous spacing — same brand language as the rest
 * of the site, just stretched out so each case-study has room to breathe.
 */
export default function ProjectDetail() {
  useSmoothScroll()
  const { slug } = useParams<{ slug: string }>()
  const root = useRef<HTMLDivElement>(null)

  const project = projects.find((p) => p.id === slug)

  // Find the next project in the list (loops back to the first)
  const nextProject = (() => {
    if (!project) return null
    const idx = projects.findIndex((p) => p.id === project.id)
    return projects[(idx + 1) % projects.length]
  })()

  // Reset scroll to top when navigating between projects
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Scroll-driven reveals
  useEffect(() => {
    if (!project) return
    const ctx = gsap.context(() => {
      gsap.from('[data-pd-hero] > *', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        delay: 0.1,
      })

      gsap.from('[data-pd-meta] > *', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-pd-meta]', start: 'top 80%' },
      })

      gsap.utils.toArray<HTMLElement>('[data-pd-process]').forEach((el) => {
        gsap.from(el.querySelectorAll('[data-pd-process-block]'), {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 75%' },
        })
      })

      gsap.from('[data-pd-gallery] img', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-pd-gallery]', start: 'top 80%' },
      })

      gsap.from('[data-pd-result]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-pd-results]', start: 'top 80%' },
      })

      gsap.from('[data-pd-next] > *', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-pd-next]', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [project])

  if (!project) {
    return (
      <main className="min-h-screen bg-ink text-bone grid place-items-center px-6">
        <div className="text-center max-w-md">
          <div className="text-[11px] uppercase tracking-[0.3em] text-bone/45 mb-4">
            404
          </div>
          <h1 className="font-sans font-light text-4xl lg:text-5xl tracking-[-0.02em] mb-6">
            Project not found
          </h1>
          <p className="text-bone/65 mb-10">
            We couldn't find a project at that URL. It may have been moved or
            archived.
          </p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-5 py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-bone hover:text-ink transition-colors duration-300"
          >
            ← Back to all projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main ref={root} className="relative bg-ink text-bone overflow-hidden">
      <Nav />

      {/* HERO ---------------------------------------------------------- */}
      <section className="relative pt-32 lg:pt-40 pb-12 lg:pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          {/* Breadcrumb */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-bone/45 hover:text-bone transition-colors mb-12 lg:mb-20"
          >
            <span>←</span>
            <span>All projects</span>
          </Link>

          <div data-pd-hero>
            {/* Eyebrow row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 lg:mb-14 text-[11px] uppercase tracking-[0.3em] text-bone/55">
              <span className="inline-flex items-center gap-2">
                {project.status === 'In Progress' ? (
                  <span className="size-1.5 rounded-full bg-acid animate-pulse" />
                ) : (
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: project.color }}
                  />
                )}
                {project.status}
              </span>
              <span className="size-1 rounded-full bg-bone/30" />
              <span>{project.year}</span>
              <span className="size-1 rounded-full bg-bone/30" />
              <span>{project.category}</span>
            </div>

            {/* Title */}
            <h1 className="font-sans font-light text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-[-0.03em] text-bone max-w-[18ch]">
              {project.title}
              <span className="text-acid">.</span>
            </h1>

            {/* Blurb */}
            <p className="mt-8 lg:mt-12 text-bone/70 text-lg lg:text-2xl leading-relaxed max-w-3xl">
              {project.blurb}
            </p>
          </div>
        </div>
      </section>

      {/* COVER IMAGE --------------------------------------------------- */}
      <section className="px-4 lg:px-6 mb-20 lg:mb-32">
        <div className="mx-auto max-w-[1700px]">
          <div className="relative aspect-[16/9] lg:aspect-[16/8] rounded-2xl overflow-hidden bg-bone/[0.04]">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, transparent 0%, transparent 60%, rgba(10,10,10,0.4) 100%), linear-gradient(140deg, ${project.color}22 0%, transparent 50%)`,
              }}
            />
          </div>
        </div>
      </section>

      {/* META + OVERVIEW ------------------------------------------------ */}
      <section className="px-6 lg:px-12 mb-24 lg:mb-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Meta */}
            <dl
              data-pd-meta
              className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-5"
            >
              <MetaRow label="Client" value={project.client} />
              <MetaRow label="Industry" value={project.industry} />
              <MetaRow label="Year" value={project.year} />
              <MetaRow
                label="Timeline"
                value={`${project.timelineWeeks} weeks · design phase`}
              />
              <MetaRow label="Status" value={project.status} />
              <div className="border-t border-bone/10 pt-5">
                <dt className="text-[10px] uppercase tracking-[0.28em] text-bone/45 mb-3">
                  Services
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full border border-bone/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-bone/80"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              {project.href && (
                <div className="pt-4">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-bone text-ink px-5 py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-acid transition-colors duration-300"
                  >
                    Visit live site
                    <span className="text-ink/70 group-hover:text-ink">↗</span>
                  </a>
                </div>
              )}
            </dl>

            {/* Overview */}
            <div className="lg:col-span-8 lg:pt-2">
              <div className="flex items-center gap-3 mb-8 text-[11px] uppercase tracking-[0.3em] text-bone/45">
                <span className="font-mono">(01)</span>
                <span className="block w-8 h-px bg-bone/30" />
                Overview
              </div>
              <p className="font-sans font-light text-[clamp(1.3rem,2.2vw,2rem)] leading-[1.35] tracking-[-0.01em] text-bone/90">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS -------------------------------------------------------- */}
      <section
        data-pd-process
        className="relative px-6 lg:px-12 mb-24 lg:mb-40"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-bone/45 mb-6">
                <span className="font-mono">(02)</span>
                <span className="block w-8 h-px bg-bone/30" />
                The process
              </div>
            </div>
            <div className="lg:col-span-8 space-y-16 lg:space-y-24">
              {project.process.map((block, i) => (
                <article
                  key={i}
                  data-pd-process-block
                  className="border-t border-bone/10 pt-8 lg:pt-10"
                >
                  <div className="flex items-baseline gap-4 mb-4 lg:mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-sans font-light text-[clamp(1.6rem,3.2vw,2.6rem)] leading-tight tracking-[-0.015em]">
                      {block.heading}
                    </h3>
                  </div>
                  <p className="text-bone/70 text-base lg:text-lg leading-relaxed lg:pl-10">
                    {block.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY -------------------------------------------------------- */}
      {project.gallery.length > 0 && (
        <section className="px-4 lg:px-6 mb-24 lg:mb-40">
          <div className="mx-auto max-w-[1700px]">
            <div className="px-2 lg:px-6 mb-10 lg:mb-14 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-bone/45">
              <span className="font-mono">(03)</span>
              <span className="block w-8 h-px bg-bone/30" />
              Gallery
            </div>
            <div
              data-pd-gallery
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6"
            >
              {project.gallery.map((src, i) => {
                // Alternate between full-width and a 2/3 + 1/3 pairing
                const isFull = i % 3 === 0
                return (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl bg-bone/[0.04] ${
                      isFull
                        ? 'lg:col-span-12 aspect-[16/9]'
                        : i % 3 === 1
                          ? 'lg:col-span-7 aspect-[16/10]'
                          : 'lg:col-span-5 aspect-[4/5]'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${project.title} — gallery ${i + 1}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* RESULTS + TAKEAWAY -------------------------------------------- */}
      <section
        data-pd-results
        className="px-6 lg:px-12 mb-24 lg:mb-40"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-bone/45 mb-6">
                <span className="font-mono">(04)</span>
                <span className="block w-8 h-px bg-bone/30" />
                Results
              </div>
            </div>

            <div className="lg:col-span-8">
              {/* Metrics */}
              {project.results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-bone/10 rounded-2xl overflow-hidden mb-16 lg:mb-24">
                  {project.results.map((r, i) => (
                    <div
                      key={i}
                      data-pd-result
                      className="bg-ink p-7 lg:p-10"
                    >
                      <div className="font-sans font-light text-5xl lg:text-6xl tracking-tight text-bone">
                        {r.metric}
                      </div>
                      <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-bone/55">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Takeaway */}
              <div className="border-t border-bone/10 pt-10 lg:pt-12">
                <div className="text-[10px] uppercase tracking-[0.28em] text-bone/45 mb-5">
                  Takeaway
                </div>
                <p className="font-sans font-light text-[clamp(1.3rem,2.4vw,2.2rem)] leading-[1.3] tracking-[-0.015em] text-bone/90 max-w-3xl">
                  &ldquo;{project.takeaway}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT PROJECT --------------------------------------------------- */}
      {nextProject && (
        <section className="px-4 lg:px-6 mb-16 lg:mb-24">
          <div className="mx-auto max-w-[1700px]">
            <Link
              to={`/work/${nextProject.id}`}
              data-pd-next
              className="group block relative overflow-hidden rounded-2xl bg-bone/[0.03] border border-bone/8 hover:border-bone/20 transition-colors duration-500"
            >
              <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Left meta */}
                <div className="lg:col-span-5 px-8 lg:px-12 py-10 lg:py-16">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-bone/45 mb-5">
                    Next project →
                  </div>
                  <h3 className="font-sans font-light text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] mb-4">
                    {nextProject.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-bone/55">
                    {nextProject.type}
                  </p>
                </div>

                {/* Right image */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden">
                  <img
                    src={nextProject.image}
                    alt={nextProject.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.15) 40%, transparent 70%), linear-gradient(140deg, ${nextProject.color}22 0%, transparent 60%)`,
                    }}
                  />
                  <span className="absolute top-6 right-6 size-12 lg:size-14 rounded-full border border-bone/30 bg-ink/40 backdrop-blur grid place-items-center text-bone/80 group-hover:bg-acid group-hover:border-acid group-hover:text-ink transition-all duration-500">
                    →
                  </span>
                </div>
              </div>
            </Link>

            <div className="mt-8 text-center">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-bone/55 hover:text-bone transition-colors"
              >
                Or browse all {projects.length} projects
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Small floating "credit" — Sketchfab attribution stays in main footer,
          but this gives the contact CTA a quick second appearance. */}
      <div
        aria-hidden
        className="absolute right-6 bottom-2 text-[10px] uppercase tracking-[0.28em] text-bone/30 hidden lg:block"
      >
        {site.yearRange}
      </div>
    </main>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-bone/10 pt-5">
      <dt className="text-[10px] uppercase tracking-[0.28em] text-bone/45 mb-1.5">
        {label}
      </dt>
      <dd className="text-bone text-base lg:text-[1.05rem]">{value}</dd>
    </div>
  )
}
