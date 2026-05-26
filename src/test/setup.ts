import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// --- jsdom shims for things our components touch ---

// matchMedia: GSAP's matchMedia plugin probes this on import.
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// IntersectionObserver: ScrollTrigger doesn't need it but other libs might.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
// @ts-expect-error — jsdom doesn't ship IO
window.IntersectionObserver = IO

// requestAnimationFrame: jsdom provides it, but make it deterministic.
window.requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 0) as unknown as number
window.cancelAnimationFrame = (id: number) => clearTimeout(id)

// --- Module mocks for animation libs that need real DOM/GPU ---

// Lenis: no-op constructor with the minimal surface our hook calls.
vi.mock('lenis', () => {
  return {
    default: class Lenis {
      on() {}
      off() {}
      raf() {}
      destroy() {}
    },
  }
})

// GSAP: full no-op shim. We test render + DOM, not animation.
vi.mock('gsap', () => {
  const tween = {
    kill: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    timeScale: vi.fn(),
    progress: vi.fn(),
  }
  const timeline = () => ({
    from: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    add: vi.fn().mockReturnThis(),
    play: vi.fn(),
    pause: vi.fn(),
    kill: vi.fn(),
  })
  const ctx = (fn: () => void) => {
    try {
      fn()
    } catch {
      /* ignore — animation setup that needs real DOM */
    }
    return { revert: vi.fn() }
  }
  const gsap = {
    registerPlugin: vi.fn(),
    context: ctx,
    from: vi.fn(() => tween),
    to: vi.fn(() => tween),
    fromTo: vi.fn(() => tween),
    set: vi.fn(),
    timeline,
    utils: {
      toArray: <T,>() => [] as T[],
    },
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
    globalTimeline: { pause: vi.fn(), resume: vi.fn() },
  }
  return { gsap, default: gsap }
})

vi.mock('gsap/ScrollTrigger', () => {
  return {
    ScrollTrigger: {
      create: vi.fn(),
      update: vi.fn(),
      refresh: vi.fn(),
      getAll: () => [],
    },
  }
})

vi.mock('gsap/Draggable', () => ({
  Draggable: { create: vi.fn(() => [{ kill: vi.fn() }]) },
}))

vi.mock('gsap/InertiaPlugin', () => ({ InertiaPlugin: {} }))
