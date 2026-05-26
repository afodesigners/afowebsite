import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Nav } from '../components/Nav'

function renderNavAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Nav />
    </MemoryRouter>,
  )
}

describe('Nav', () => {
  it('renders the new SVG wordmark logo instead of text "AFO®"', () => {
    renderNavAt('/')
    const logo = screen.getByAltText(/after office/i)
    expect(logo).toHaveAttribute('src', '/logotype.svg')
    expect(logo.tagName).toBe('IMG')
  })

  it('shows nav links pointing at real routes', () => {
    renderNavAt('/')
    expect(screen.getByRole('link', { name: /^index$/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /^work$/i })).toHaveAttribute('href', '/work')
    expect(screen.getByRole('link', { name: /^studio$/i })).toHaveAttribute('href', '/studio')
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '/contact')
  })

  it('keeps the "Book a call" CTA in the top bar', () => {
    renderNavAt('/')
    expect(screen.getByRole('link', { name: /book a call/i })).toBeInTheDocument()
  })
})
