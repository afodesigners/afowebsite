import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Testimonials } from '../components/Testimonials'
import { testimonials } from '../data/site'

describe('Testimonials marquee', () => {
  it('renders the section header', () => {
    render(<Testimonials />)
    expect(
      screen.getByRole('heading', { level: 2, name: /inspiring client experiences/i }),
    ).toBeInTheDocument()
  })

  it('duplicates the testimonial list for a seamless marquee loop', () => {
    render(<Testimonials />)
    // Each unique name appears twice (once per copy) — check the first.
    const firstName = testimonials[0].name
    const matches = screen.getAllByText(firstName)
    expect(matches.length).toBe(2)
  })

  it('renders every testimonial quote', () => {
    render(<Testimonials />)
    testimonials.forEach((t) => {
      // duplicated → at least one match
      expect(screen.getAllByText(t.quote).length).toBeGreaterThan(0)
    })
  })

  it('shows the "hover to pause / hover a card to read" hint', () => {
    render(<Testimonials />)
    expect(screen.getByText(/hover to pause/i)).toBeInTheDocument()
  })
})
