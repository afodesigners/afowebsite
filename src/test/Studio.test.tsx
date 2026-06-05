import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Studio from '../routes/Studio'
import { founders, journey } from '../data/site'

function renderAt() {
  return render(
    <MemoryRouter initialEntries={['/studio']}>
      <Studio />
    </MemoryRouter>,
  )
}

describe('Studio (About) page', () => {
  it('renders the new hero — "A small studio, built after hours"', () => {
    renderAt()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toMatch(/small studio/i)
    expect(h1.textContent).toMatch(/after hours/i)
  })

  it('renders the journey eyebrow + lead', () => {
    renderAt()
    expect(screen.getByText(new RegExp(journey.eyebrow, 'i'))).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: new RegExp(journey.lead, 'i') }),
    ).toBeInTheDocument()
  })

  it('renders every milestone year + label', () => {
    renderAt()
    journey.milestones.forEach((m) => {
      expect(screen.getByText(m.year)).toBeInTheDocument()
      expect(screen.getByText(m.label)).toBeInTheDocument()
    })
  })

  it('renders both founders with name + role', () => {
    renderAt()
    expect(founders.length).toBe(2)
    founders.forEach((f) => {
      expect(
        screen.getByRole('heading', { level: 3, name: f.name }),
      ).toBeInTheDocument()
      expect(screen.getByText(f.role)).toBeInTheDocument()
    })
  })

  it('does NOT render the removed Careers / principles / large team grid', () => {
    renderAt()
    expect(screen.queryByText(/come build with us/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/open roles/i)).not.toBeInTheDocument()
    // Principles got removed too
    expect(screen.queryByText(/less, but better/i)).not.toBeInTheDocument()
    // The old 6-person team grid is gone — Dimas, Sasha, Reza, Naya not shown
    expect(screen.queryByText(/dimas pratama/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/sasha maharani/i)).not.toBeInTheDocument()
  })

  it('closer CTA links to /contact', () => {
    renderAt()
    const cta = screen.getByRole('link', { name: /start a project/i })
    expect(cta).toHaveAttribute('href', '/contact')
  })
})
