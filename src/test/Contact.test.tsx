import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Contact from '../routes/Contact'
import { faqs, site } from '../data/site'

function renderAt() {
  return render(
    <MemoryRouter initialEntries={['/contact']}>
      <Contact />
    </MemoryRouter>,
  )
}

describe('Contact page', () => {
  beforeEach(() => {
    // jsdom doesn't support navigation; stub it for the mailto: submit path.
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, href: '' },
    })
  })

  it('opens directly with the Mad Libs form (no "Let\'s talk" hero)', () => {
    renderAt()
    expect(screen.queryByRole('heading', { level: 1, name: /let.s talk/i })).not.toBeInTheDocument()
    expect(screen.getByText(/write us a note/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
  })

  it('renders all 6 form fields (name, company, message, budget, timeframe, email)', () => {
    renderAt()
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/^company$/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tell us what you're building/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/you@company/i)).toBeInTheDocument()
    // Two selects (budget + timeframe) — count by tag
    expect(document.querySelectorAll('select')).toHaveLength(2)
  })

  it('submit builds a mailto: URL with the entered values', async () => {
    const user = userEvent.setup()
    renderAt()
    await user.type(screen.getByPlaceholderText(/your name/i), 'Ada Lovelace')
    await user.type(screen.getByPlaceholderText(/^company$/i), 'Analytical Engines')
    await user.type(
      screen.getByPlaceholderText(/tell us what you're building/i),
      'A brand from scratch.',
    )
    await user.selectOptions(document.querySelectorAll('select')[0], '$20k – $50k')
    await user.selectOptions(document.querySelectorAll('select')[1], 'next quarter')
    await user.type(screen.getByPlaceholderText(/you@company/i), 'ada@engines.dev')

    // jsdom blocks real form submission; intercept and inspect the request.
    const submit = screen.getByRole('button', { name: /send the brief/i })
    const form = submit.closest('form')!
    // Prevent unhandled jsdom navigation
    form.addEventListener('submit', (e) => e.preventDefault(), { once: true, capture: true })
    fireEvent.submit(form)

    // The component sets window.location.href to a mailto: URL on submit.
    expect(window.location.href).toMatch(/^mailto:/)
    expect(decodeURIComponent(window.location.href)).toContain(site.email)
    expect(decodeURIComponent(window.location.href)).toContain('Ada Lovelace')
    expect(decodeURIComponent(window.location.href)).toContain('Analytical Engines')
    expect(decodeURIComponent(window.location.href)).toContain('A brand from scratch.')
    expect(decodeURIComponent(window.location.href)).toContain('$20k – $50k')
    expect(decodeURIComponent(window.location.href)).toContain('next quarter')
  })

  it('renders the FAQ section with all questions', () => {
    renderAt()
    faqs.forEach((f) => {
      expect(screen.getByText(f.q)).toBeInTheDocument()
    })
  })

  it('does NOT render the removed Studio HQ / address block', () => {
    renderAt()
    expect(screen.queryByText(/studio hq/i)).not.toBeInTheDocument()
    expect(screen.queryByText(site.address.line1)).not.toBeInTheDocument()
    expect(screen.queryByText(site.phone)).not.toBeInTheDocument()
  })

  it('renders Email + Book a call blocks in the "Or reach us directly" section', () => {
    renderAt()
    expect(screen.getByText(/or reach us directly/i)).toBeInTheDocument()
    // The email block displays site.email
    expect(screen.getAllByText(site.email).length).toBeGreaterThan(0)
  })
})

// Silence "vi is unused" if a path drops a usage
void vi
