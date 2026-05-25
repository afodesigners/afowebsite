import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import type { Group } from 'three'

const MOON_URL = '/models/moon.glb'

/**
 * The moon mesh — rotation is lerped toward a shared `targetRot` ref
 * that MoonScene mutates from pointer events. A faint constant Z drift
 * keeps the moon alive at rest.
 */
function Moon({
  targetRot,
}: {
  targetRot: React.MutableRefObject<{ x: number; y: number }>
}) {
  const ref = useRef<Group>(null)
  const gltf = useGLTF(MOON_URL)

  useFrame((_, dt) => {
    const g = ref.current
    if (!g) return
    g.rotation.x += (targetRot.current.x - g.rotation.x) * 0.12
    g.rotation.y += (targetRot.current.y - g.rotation.y) * 0.12
    // Idle Z drift — barely perceptible, keeps it from looking frozen
    g.rotation.z += dt * 0.015
  })

  return <primitive ref={ref} object={gltf.scene} scale={1.1} />
}

useGLTF.preload(MOON_URL)

type Props = {
  /** Extra Tailwind classes for positioning / sizing the canvas wrapper. */
  className?: string
}

/**
 * Drops a draggable moon onto the page. Drag the moon (mouse / touch
 * / trackpad) to spin it around. Releases keep the rotation in place.
 *
 * Uses an IntersectionObserver to pause rendering when off-screen
 * (saves battery on long pages with WebGL in the hero).
 */
export function MoonScene({ className }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const parallax = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const [grabbing, setGrabbing] = useState(false)

  // Shared rotation target — Moon's useFrame lerps toward this.
  const targetRot = useRef({ x: 0, y: 0 })
  const drag = useRef({ dragging: false, lastX: 0, lastY: 0 })

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Inverse cursor parallax — when cursor moves to top-right, moon shifts
  // down-left. Translates the inner parallax wrapper, so the outer wrapper's
  // Tailwind positioning classes stay intact.
  useEffect(() => {
    let raf = 0
    let interval: ReturnType<typeof setInterval> | null = null
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const onMove = (e: MouseEvent) => {
      // Normalize cursor to [-0.5, 0.5] then negate for the inverse motion.
      tx = -(e.clientX / window.innerWidth - 0.5) * 70
      ty = -(e.clientY / window.innerHeight - 0.5) * 50
    }

    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      if (parallax.current) {
        parallax.current.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      }
    }

    const rafLoop = () => {
      tick()
      raf = requestAnimationFrame(rafLoop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(rafLoop)
    // Safety net for headless / throttled environments where rAF stalls
    interval = setInterval(tick, 16)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (interval) clearInterval(interval)
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.dragging = true
    drag.current.lastX = e.clientX
    drag.current.lastY = e.clientY
    // Capture so we still get move/up even if pointer leaves the element
    e.currentTarget.setPointerCapture(e.pointerId)
    setGrabbing(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging) return
    const dx = e.clientX - drag.current.lastX
    const dy = e.clientY - drag.current.lastY
    // px → radians. ~0.005 means a 200px drag rotates by ~57°.
    targetRot.current.y += dx * 0.005
    targetRot.current.x += dy * 0.005
    drag.current.lastX = e.clientX
    drag.current.lastY = e.clientY
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging) return
    drag.current.dragging = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // capture may already be released; ignore
    }
    setGrabbing(false)
  }

  return (
    <div
      ref={wrap}
      className={`${grabbing ? 'cursor-grabbing' : 'cursor-grab'} select-none ${className ?? ''}`}
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="img"
      aria-label="3D moon — drag to rotate"
    >
      {/* Parallax inner wrapper — receives the inverse cursor translate */}
      <div
        ref={parallax}
        className="absolute inset-0 will-change-transform"
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 32 }}
          dpr={[1, 1.5]}
          frameloop={active ? 'always' : 'never'}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.18} />
          {/* Raking light — gives the moon a soft terminator (day/night line) */}
          <directionalLight
            position={[-3, 1.4, 4]}
            intensity={1.7}
            color="#fff5dc"
          />
          {/* Tiny rim from the opposite side so the dark half isn't fully black */}
          <directionalLight
            position={[3, -0.5, -2]}
            intensity={0.18}
            color="#88a0c4"
          />
          <Suspense fallback={null}>
            <Moon targetRot={targetRot} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
