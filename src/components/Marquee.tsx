import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type Props = {
  items: string[]
  speed?: number
  reverse?: boolean
  className?: string
}

/**
 * Seamless looping marquee.
 *
 * The trick: each item carries its OWN trailing padding (`pr-12`),
 * and the parent flex has NO gap. That way `scrollWidth / 2` is
 * exactly the width of one duplicated set — so wrapping by -half
 * lands the second copy's first item precisely where the first
 * copy's first item used to be. No visible seam, no empty gap.
 */
export function Marquee({ items, speed = 40, reverse = false, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const half = track.scrollWidth / 2
    const tween = gsap.fromTo(
      track,
      { x: reverse ? -half : 0 },
      {
        x: reverse ? 0 : -half,
        duration: half / speed,
        ease: 'none',
        repeat: -1,
      },
    )
    return () => {
      tween.kill()
    }
  }, [items, speed, reverse])

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ''}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-12 shrink-0 pr-12"
          >
            <span>{item}</span>
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
