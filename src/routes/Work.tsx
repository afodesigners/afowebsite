import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { projects } from '../data/site'
import { site } from '../data/site'

gsap.registerPlugin(Draggable, InertiaPlugin)

// One tile worth of card layouts on a virtual canvas.
// Each card has its own width/height — irregular, "messy but neat" like Mobius.
// Coordinates are relative to tile center (0,0). Tile is TILE_W × TILE_H.
const TILE_W = 1800
const TILE_H = 1400

// Each card uses the homepage WorkTeaser pattern: image area + meta strip below.
// `imgH` controls just the image height; the meta strip adds ~80px on top.
type CardLayout = { x: number; y: number; w: number; imgH: number }

// Varied dimensions for "messy but neat" feel. No rotation.
// Sized at ~1.3× original for a more substantial constellation.
const LAYOUTS: CardLayout[] = [
  { x: -680, y: -300, w: 390, imgH: 275 },  // Nexvend  — upper-left,  wide
  { x:   80, y: -340, w: 350, imgH: 470 },  // Charmrise — top-center, tall
  { x:  700, y: -130, w: 310, imgH: 415 },  // Macrons   — upper-right, tall (nudged up)
  { x: -460, y:  330, w: 440, imgH: 365 },  // Sorlys    — lower-left,  square-ish
  { x:  460, y:  470, w: 440, imgH: 285 },  // Family GI — lower-right, wide (pushed down to clear Macrons)
]

// 3×3 tile offsets — these copies make the canvas feel infinite.
const TILE_OFFSETS: Array<{ tx: number; ty: number }> = []
for (let i = -1; i <= 1; i++) {
  for (let j = -1; j <= 1; j++) {
    TILE_OFFSETS.push({ tx: i * TILE_W, ty: j * TILE_H })
  }
}

export default function Work() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const proxyRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<Draggable | null>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const applyTransformRef = useRef<() => void>(() => {})
  const setPosRef = useRef<(x: number, y: number) => void>(() => {})
  const [activeIdx, setActiveIdx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [, force] = useState(0)

  useEffect(() => {
    document.title = `Work · AFO® After Office`
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const proxy = proxyRef.current
    if (!wrap || !canvas || !proxy) return

    const applyTransform = () => {
      const { x, y } = posRef.current
      // wrap into tile by modulo so the canvas feels infinite
      const wx = ((x % TILE_W) + TILE_W) % TILE_W
      const wy = ((y % TILE_H) + TILE_H) % TILE_H
      // re-center: shift back by TILE_W/2 so wrapping origin is mid-tile
      gsap.set(canvas, {
        x: wx - TILE_W / 2,
        y: wy - TILE_H / 2,
        force3D: true,
      })
      updateActive()
    }
    applyTransformRef.current = applyTransform

    const updateActive = () => {
      // Active card = whichever instance is closest to viewport center.
      // Cards are NOT scaled — variable sizes already create natural rhythm.
      const cards = canvas.querySelectorAll<HTMLElement>('[data-canvas-card]')
      if (!cards.length) return
      const cx = wrap.clientWidth / 2
      const cy = wrap.clientHeight / 2
      let best = Infinity
      let bestIdx = 0
      cards.forEach((el) => {
        const r = el.getBoundingClientRect()
        const dx = r.left + r.width / 2 - cx
        const dy = r.top + r.height / 2 - cy
        const d = dx * dx + dy * dy
        if (d < best) {
          best = d
          bestIdx = Number(el.dataset.cardIdx)
        }
      })
      setActiveIdx((prev) => (prev !== bestIdx ? bestIdx : prev))
    }

    // wheel target — pre-declared so onDrag/setPos can sync it
    const target = { x: 0, y: 0 }

    const drag = Draggable.create(proxy, {
      type: 'x,y',
      trigger: wrap,
      inertia: true,
      throwResistance: 1400,
      dragResistance: 0.06,
      // GSAP only fires onClick if the user pressed-and-released
      // WITHOUT dragging — exactly the behavior we want.
      onClick() {
        const e = this.pointerEvent as PointerEvent | MouseEvent | undefined
        if (!e) return
        const target = document.elementFromPoint(e.clientX, e.clientY)
        const card = (target as Element | null)?.closest(
          '[data-canvas-card]',
        ) as HTMLElement | null
        if (!card) return
        const href = card.dataset.cardHref
        if (href && href !== '#') {
          window.open(href, '_blank', 'noopener,noreferrer')
        }
      },
      onPress() {
        setIsDragging(true)
        gsap.killTweensOf(posRef.current)
        // sync Draggable starting point with current animated position
        gsap.set(proxy, { x: posRef.current.x, y: posRef.current.y })
        this.update()
      },
      onDrag() {
        posRef.current.x = this.x
        posRef.current.y = this.y
        target.x = this.x
        target.y = this.y
        applyTransform()
      },
      onThrowUpdate() {
        posRef.current.x = this.x
        posRef.current.y = this.y
        target.x = this.x
        target.y = this.y
        applyTransform()
      },
      onRelease() {
        setIsDragging(false)
      },
    })[0]
    dragRef.current = drag

    const setPos = (x: number, y: number) => {
      target.x = x
      target.y = y
      startTicker()
    }
    setPosRef.current = setPos

    // rAF-eased lerp toward target. Falls back to setInterval if rAF is throttled.
    let easeRunning = false
    let easeRaf = 0
    let easeInterval: ReturnType<typeof setInterval> | null = null
    const ease = () => {
      const lerp = 0.18
      const dx = target.x - posRef.current.x
      const dy = target.y - posRef.current.y
      posRef.current.x += dx * lerp
      posRef.current.y += dy * lerp
      applyTransform()
      const settled = Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3
      if (settled) {
        posRef.current.x = target.x
        posRef.current.y = target.y
        applyTransform()
        if (easeRaf) cancelAnimationFrame(easeRaf)
        if (easeInterval) clearInterval(easeInterval)
        easeRaf = 0
        easeInterval = null
        easeRunning = false
      } else {
        easeRaf = requestAnimationFrame(ease)
      }
    }
    const startTicker = () => {
      if (easeRunning) return
      easeRunning = true
      // Apply one immediate small step so motion shows even if rAF is throttled.
      const stepLerp = 0.5
      posRef.current.x += (target.x - posRef.current.x) * stepLerp
      posRef.current.y += (target.y - posRef.current.y) * stepLerp
      applyTransform()
      easeRaf = requestAnimationFrame(ease)
      // safety-net: if rAF doesn't fire (headless / hidden), interval drives it.
      easeInterval = setInterval(() => ease(), 16)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      target.x -= e.deltaX
      target.y -= e.deltaY
      // partial immediate response so motion is felt even before rAF runs;
      // the ticker eases the remaining distance smoothly.
      const kick = 0.4
      posRef.current.x += (target.x - posRef.current.x) * kick
      posRef.current.y += (target.y - posRef.current.y) * kick
      applyTransform()
      startTicker()
    }
    wrap.addEventListener('wheel', onWheel, { passive: false })

    // keyboard
    const onKey = (e: KeyboardEvent) => {
      const step = 260
      if (e.key === 'ArrowRight') setPos(posRef.current.x - step, posRef.current.y)
      else if (e.key === 'ArrowLeft')
        setPos(posRef.current.x + step, posRef.current.y)
      else if (e.key === 'ArrowDown')
        setPos(posRef.current.x, posRef.current.y - step)
      else if (e.key === 'ArrowUp')
        setPos(posRef.current.x, posRef.current.y + step)
      else if (e.key === 'Home') setPos(0, 0)
      else if (e.key === 'Escape') {
        window.location.href = '/'
      }
    }
    window.addEventListener('keydown', onKey)

    applyTransform()

    // re-run active detection on resize
    const onResize = () => applyTransform()
    window.addEventListener('resize', onResize)

    // trigger a re-render once so React state syncs with first paint
    force((n) => n + 1)

    return () => {
      wrap.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      if (easeRaf) cancelAnimationFrame(easeRaf)
      if (easeInterval) clearInterval(easeInterval)
      drag.kill()
    }
  }, [])

  const goToProject = (i: number) => {
    if (!canvasRef.current) return
    const layout = LAYOUTS[i]
    const curX = posRef.current.x
    const curY = posRef.current.y
    // pick the nearest tile copy so we don't traverse multiple tiles
    const bestTx = Math.round((curX - -layout.x) / TILE_W) * TILE_W
    const bestTy = Math.round((curY - -layout.y) / TILE_H) * TILE_H
    const newX = -layout.x + bestTx
    const newY = -layout.y + bestTy
    setPosRef.current(newX, newY)
  }

  return (
    <main className="fixed inset-0 bg-ink text-bone overflow-hidden select-none">
      {/* SUPER-BACKGROUND giant WORK title — bone on ink, brand-aligned */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center z-0"
      >
        <span
          className="font-sans font-medium leading-none tracking-[-0.045em] text-bone/[0.07] whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 16vw, 22rem)' }}
        >
          Work
          <span className="inline-block ml-2 text-acid/30">.</span>
        </span>
      </div>

      {/* DRAGGABLE CANVAS */}
      <div
        ref={wrapRef}
        className={`relative h-full w-full ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } z-10`}
      >
        <div
          ref={canvasRef}
          className="absolute top-1/2 left-1/2 will-change-transform"
          style={{ width: TILE_W, height: TILE_H }}
        >
          {/* Render the constellation across the 3×3 tile grid */}
          {TILE_OFFSETS.map(({ tx, ty }, tileI) =>
            LAYOUTS.map((layout, i) => {
              const p = projects[i % projects.length]
              const cardX = layout.x + tx
              const cardY = layout.y + ty
              return (
                <article
                  key={`${tileI}-${i}`}
                  data-canvas-card
                  data-card-idx={i}
                  data-card-href={p.href}
                  className="absolute top-1/2 left-1/2 will-change-transform group"
                  style={{
                    transform: `translate(-50%, -50%) translate(${cardX}px, ${cardY}px)`,
                    width: layout.w,
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-bone/8 bg-bone/[0.02] group-hover:bg-bone/[0.05] transition-colors duration-500">
                    {/* Image area */}
                    <div
                      className="relative overflow-hidden bg-ink"
                      style={{ height: layout.imgH }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.7) 100%), linear-gradient(160deg, ${p.color}26 0%, transparent 55%)`,
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-bone/80"
                      >
                        {String(i + 1).padStart(2, '0')} · {p.year}
                      </span>
                      <span
                        aria-hidden
                        className="absolute top-4 right-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-bone/85"
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
                    {/* Meta strip */}
                    <div className="p-4 lg:p-5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-sans font-medium text-base lg:text-lg tracking-[-0.01em] truncate">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-bone/55 truncate">
                          {p.type} · {p.timelineWeeks}w
                        </p>
                      </div>
                      <span className="size-8 shrink-0 rounded-full border border-bone/15 grid place-items-center text-xs text-bone/60 group-hover:bg-acid group-hover:border-acid group-hover:text-ink transition-all duration-500">
                        →
                      </span>
                    </div>
                  </div>
                </article>
              )
            }),
          )}
        </div>

        {/* invisible proxy for Draggable */}
        <div ref={proxyRef} className="absolute opacity-0 pointer-events-none" />
      </div>

      {/* STICKY OVERLAY (nav, hint, active title, counter) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
        {/* Top bar */}
        <header className="pt-5 lg:pt-6 px-6 lg:px-10 pointer-events-none">
          <div className="flex items-center justify-between pointer-events-auto">
            <Link
              to="/"
              className="inline-flex items-baseline gap-0.5 text-xl tracking-tight text-bone"
            >
              <span className="font-medium">{site.name}</span>
              <span className="text-acid text-[0.7em] -translate-y-1.5 font-medium">
                {site.mark}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-bone/55">
              <span>{site.yearRange}</span>
              <span className="size-1 rounded-full bg-bone/30" />
              <span>Selected work</span>
              <span className="size-1 rounded-full bg-bone/30" />
              <span className="text-bone/75">scroll / drag</span>
            </div>

            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full border border-bone/15 bg-ink/40 backdrop-blur-md px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-bone hover:bg-bone hover:text-ink transition-colors duration-300"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              Close
              <span className="hidden lg:inline text-bone/40 group-hover:text-ink/40">
                ESC
              </span>
            </Link>
          </div>
        </header>

        {/* Bottom hint bar — mt-auto pushes it to the bottom of the overlay column */}
        <footer className="mt-auto pointer-events-none px-6 lg:px-10 pb-5 lg:pb-7">
          <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/40">
            <span className="font-mono pointer-events-auto">
              Drag · scroll · click to open
            </span>
            <div className="hidden md:flex items-center gap-1.5 pointer-events-auto">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToProject(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`size-2 rounded-full transition-all duration-300 ${
                    activeIdx === i
                      ? 'bg-acid w-6'
                      : 'bg-bone/20 hover:bg-bone/50'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono hidden md:inline">
              ↑ ↓ ← →  ·  ESC to close
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}
