import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type Props = {
  items: string[]
  speed?: number
  reverse?: boolean
  className?: string
}

export function Marquee({ items, speed = 40, reverse = false, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const half = track.scrollWidth / 2
    const tween = gsap.to(track, {
      x: reverse ? half : -half,
      duration: half / speed,
      ease: 'none',
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [items, speed, reverse])

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ''}`}>
      <div ref={trackRef} className="flex w-max gap-12 will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12 shrink-0">
            <span>{item}</span>
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
