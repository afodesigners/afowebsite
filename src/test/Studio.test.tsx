import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Studio from '../routes/Studio'
import { team, principles } from '../data/site'

function renderAt() {
  return render(
    <MemoryRouter initialEntries={['/studio']}>
      <Studio />
    </MemoryRouter>,
  )
}

describe('Studio page', () => {
  it('renders the hero headline "We are AFO"', () => {
    renderAt()
    expect(
      screen.getByRole('heading', { level: 1, name: /we are afo/i }),
    ).toBeInTheDocument()
  })

  it('renders all three principles', () => {
    renderAt()
    principles.forEach((p) => {
      expect(
        screen.getByRole('heading', { level: 3, name: p.title }),
      ).toBeInTheDocument()
    })
  })

  it('renders every team member with name + role', () => {
    renderAt()
    team.forEach((m) => {
      expect(screen.getByText(m.name)).toBeInTheDocument()
      expect(screen.getByText(m.role)).toBeInTheDocument()
    })
  })

  it('does NOT render the removed Careers/Open roles section', () => {
    renderAt()
    expect(screen.queryByText(/come build with us/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/open roles/i)).not.toBeInTheDocument()
  })

  it('closer CTA links to /contact', () => {
    renderAt()
    const cta = screen.getByRole('link', { name: /start a project/i })
    expect(cta).toHaveAttribute('href', '/contact')
  })
})
