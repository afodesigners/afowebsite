export const site = {
  name: 'AFO',
  mark: '®',
  longName: 'After Office',
  yearRange: '© 2022—26',
  // Hero — short, bold, two-beat statement
  heroSentence: 'Big ideas. Bold impact.',
  // Intro / Manifesto — single statement
  introEyebrow: 'Ideas in motion',
  introStatement:
    'We are a small studio in Jakarta — clear, collaborative, focused. We shape every project with intention, so each release feels inevitable instead of accidental.',
  bookingUrl: 'https://calendly.com/heyafteroffice/30min',
  email: 'hello@afterofficestudio.com',
  phone: '+62 811 1234 5678',
  address: {
    line1: 'After Office Studio',
    line2: 'Jl. Kemang Raya No. 12',
    line3: 'Jakarta Selatan 12730, Indonesia',
  },
  location: 'Jakarta · Worldwide',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Behance', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
}

export type Project = {
  id: string
  title: string
  /** Short category (used in tight UI). */
  category: string
  /** Full "Type" string as written in the source PDF. */
  type: string
  year: string
  status: 'In Progress' | 'Delivered'
  /** Goal sentence from the PDF. */
  blurb: string
  /** Design-phase timeline in weeks (per the PDF). */
  timelineWeeks: number
  color: string
  image: string
  href: string
}

// Unsplash photo IDs chosen to visually represent each industry.
// Swap for real project screenshots when ready.
const UNSPLASH = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// NOTE: `href` values below are best-guess domains because the PDF's
// "Link to project" hyperlinks weren't exposed in the extracted text.
// Replace each with the real live URL when known.
export const projects: Project[] = [
  {
    id: 'nexvend',
    title: 'Nexvend',
    category: 'Marketing · Vending',
    type: 'Marketing Website · Vending Machine Industry',
    year: '2025',
    status: 'In Progress',
    blurb:
      'Designed a conversion-focused website to help the client attract new buyers and grow revenue.',
    timelineWeeks: 8,
    color: '#FF7A3D',
    // Iconic Unsplash: red Nike sneaker on hot-pink — reads as "bold retail product"
    image: UNSPLASH('photo-1542291026-7eec264c27ff'),
    href: 'https://nexvend.com',
  },
  {
    id: 'charmrise',
    title: 'Charmrise',
    category: 'CRM · Sales',
    type: 'Marketing Website · CRM & Sales Platform',
    year: '2025',
    status: 'In Progress',
    blurb:
      "Created a compelling marketing site to drive sign-ups and showcase the product's value to potential users.",
    timelineWeeks: 14,
    color: '#D6FF3D',
    // Iconic Unsplash: orange Beats headphones on yellow — bold consumer-tech vibe
    image: UNSPLASH('photo-1505740420928-5e560c06d30e'),
    href: 'https://charmrise-project.vercel.app/',
  },
  {
    id: 'macrons',
    title: 'Macrons Academy',
    category: 'Education · Crypto',
    type: 'Educational Platform · Crypto Industry',
    year: '2024',
    status: 'Delivered',
    blurb:
      'Designed a crypto academy website to educate users and drive course enrollment.',
    timelineWeeks: 8,
    color: '#FFC93C',
    image: UNSPLASH('photo-1639762681485-074b7f938ba0'),
    href: 'https://macronsacademy.com',
  },
  {
    id: 'sorlys',
    title: 'Sorlys Eindom',
    category: 'Portfolio · Architecture',
    type: 'Portfolio Website · Architecture Agency',
    year: '2024',
    status: 'Delivered',
    blurb:
      "Redesigned the agency's portfolio site to showcase their work professionally and attract new clients online.",
    timelineWeeks: 12,
    color: '#8AB6FF',
    image: UNSPLASH('photo-1487958449943-2429e8be8625'),
    href: 'https://sorlyseindom.com',
  },
  {
    id: 'familygarden',
    title: 'Family Garden Inn',
    category: 'Hospitality · Hotel',
    type: 'Hospitality Website · Hotel & Inn (Texas, USA)',
    year: '2024',
    status: 'Delivered',
    blurb:
      "Modernized the inn's website to improve the booking experience and create a more inviting online presence.",
    timelineWeeks: 6,
    color: '#C0FF92',
    image: UNSPLASH('photo-1564501049412-61c2a3083791'),
    href: 'https://familygardeninn.com',
  },
]

export const services = [
  {
    n: '01',
    title: 'Branding & Identity',
    body: 'Strategy, logo systems, type & color, voice, and guidelines that scale.',
  },
  {
    n: '02',
    title: 'Web & Product',
    body: 'Websites and digital products designed and built to convert and last.',
  },
  {
    n: '03',
    title: 'Social Media',
    body: 'Content systems, campaigns, and templates that compound over time.',
  },
  {
    n: '04',
    title: 'SEO & Content',
    body: 'Findable, readable, and ranked. Content that earns its keep.',
  },
]

export const values = [
  'Creativity',
  'Expression',
  'Individuality',
  'Innovation',
  'Quality',
  'Beauty',
  'Customization',
  'Personalization',
  'Inspiration',
]

export type Testimonial = {
  name: string
  role: string
  company?: string
  quote: string
  accent?: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Jerome',
    role: 'Founder',
    company: 'Nexvend',
    quote:
      "AFO didn't just deliver a brand — they handed us a tool we use every single day.",
    accent: '#FF7A3D',
  },
  {
    name: 'Felix',
    role: 'Marketing Lead',
    company: 'Charmrise',
    quote:
      'Calm, surgical, and obsessed with the detail. The bar for our team is now permanently higher.',
    accent: '#D6FF3D',
  },
  {
    name: 'Trio',
    role: 'CEO',
    company: 'Macrons Academy',
    quote:
      'They understood the brief faster than our internal team. Twice the output, half the noise.',
    accent: '#FFC93C',
  },
  {
    name: 'Khan',
    role: 'Founder',
    company: 'Sorlys Eindom',
    quote:
      'AFO is the only studio I send unsolicited referrals to. They earn it.',
    accent: '#8AB6FF',
  },
  {
    name: 'Jonathan',
    role: 'Brand Director',
    company: 'Family Garden Inn',
    quote: 'Working with AFO feels like cheating. In the best way.',
    accent: '#C0FF92',
  },
  {
    name: 'Deborah',
    role: 'Account Director',
    company: 'Independent',
    quote:
      'The innovative approach and fast delivery were exactly what we needed. The team was collaborative and brought our ideas to life beautifully.',
    accent: '#F3F1EA',
  },
  {
    name: 'Emma',
    role: 'Creative Lead',
    company: 'Bright 5',
    quote:
      'The creativity and professionalism were unmatched. Our project was delivered on time and captured exactly what we envisioned.',
    accent: '#8AB6FF',
  },
]

export type TeamMember = {
  name: string
  role: string
  initials: string
}

export const team: TeamMember[] = [
  { name: 'Kurniawan Nugraha', role: 'Founder · Creative Director', initials: 'KN' },
  { name: 'Aulia Rizki', role: 'Design Lead', initials: 'AR' },
  { name: 'Dimas Pratama', role: 'Engineering Lead', initials: 'DP' },
  { name: 'Sasha Maharani', role: 'Brand Strategist', initials: 'SM' },
  { name: 'Reza Ardiansyah', role: 'Motion Designer', initials: 'RA' },
  { name: 'Naya Putri', role: 'Producer', initials: 'NP' },
]

export const principles = [
  {
    tag: 'A',
    title: 'Less, but better.',
    body: 'We strip what doesn\'t serve the work. Clarity is the result of dozens of quiet decisions to remove, not add.',
  },
  {
    tag: 'B',
    title: 'Long over loud.',
    body: 'Trends rotate. Systems compound. We build identities and products that still read in five years.',
  },
  {
    tag: 'C',
    title: 'One room, no walls.',
    body: 'Strategy, design, and engineering sit at the same table. No handoff tax, no telephone game — one team, one direction.',
  },
]

export type OpenRole = {
  title: string
  type: string
  location: string
  body: string
}

export const openRoles: OpenRole[] = [
  {
    title: 'Brand Designer',
    type: 'Full-time',
    location: 'Jakarta · Hybrid',
    body: 'You\'ll lead identity systems from blank page to brand book — logo, type, color, voice. Strong portfolio of editorial-grade work expected.',
  },
  {
    title: 'Product Designer',
    type: 'Full-time',
    location: 'Remote · GMT±3',
    body: 'Own end-to-end product flows for our retainer clients. Comfortable shipping in Figma, fluent in interaction craft and live prototypes.',
  },
  {
    title: 'Creative Developer',
    type: 'Contract',
    location: 'Remote',
    body: 'You bring designs to life on the web — React, GSAP, WebGL, the works. Bonus points for an obsession with micro-interactions.',
  },
]

export type Faq = {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'How do projects start?',
    a: 'Send a short note about what you\'re building and your timeline. If we\'re a fit, we\'ll book a 30-minute call and scope a small first phase together — usually a one-week sprint.',
  },
  {
    q: 'What do projects typically cost?',
    a: 'Most engagements land between $18k and $80k depending on scope. We\'ll share a flat, milestone-based proposal after our first call — no hourly billing.',
  },
  {
    q: 'How many projects do you take on?',
    a: 'Two to three at a time, max. We\'re a small team by design, so the founder stays close to every project from kickoff to launch.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Often. About half of our work is with founders raising or just past their seed round. We\'ll be honest if the timing isn\'t right.',
  },
  {
    q: 'Where are you based?',
    a: 'Jakarta, Indonesia — working with founders and teams across Asia, Europe, and the US. Async by default, with weekly checkpoints in your timezone.',
  },
]
