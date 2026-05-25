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

export const testimonials = [
  {
    name: 'Jerome',
    role: 'Founder, Studio Client',
    quote:
      "AFO didn't just deliver a brand — they handed us a tool we use every single day.",
  },
  {
    name: 'Felix',
    role: 'Marketing Lead',
    quote:
      'Calm, surgical, and obsessed with the detail. The bar for our team is now permanently higher.',
  },
  {
    name: 'Trio',
    role: 'CEO, Edutech',
    quote:
      'They understood the brief faster than our internal team. Twice the output, half the noise.',
  },
  {
    name: 'Khan',
    role: 'Founder',
    quote: 'AFO is the only studio I send unsolicited referrals to. They earn it.',
  },
  {
    name: 'Jonathan',
    role: 'Brand Director',
    quote: 'Working with AFO feels like cheating. In the best way.',
  },
]
