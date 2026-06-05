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

export type ProcessSection = {
  heading: string
  body: string
}

export type ProjectResult = {
  metric: string
  label: string
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
  /** Goal sentence from the PDF — used everywhere except the detail page. */
  blurb: string
  /** Design-phase timeline in weeks (per the PDF). */
  timelineWeeks: number
  color: string
  image: string
  href: string

  // ---- Case-study fields (used on /work/:slug detail page) ----
  /** Who the project was for. */
  client: string
  /** What industry the client operates in. */
  industry: string
  /** Disciplines used on the project. */
  services: string[]
  /** Longer overview paragraph that opens the case study. */
  description: string
  /** Narrative blocks that tell the story of how the project happened. */
  process: ProcessSection[]
  /** Headline metrics or wins from the engagement. */
  results: ProjectResult[]
  /** Closing reflection in the designer's voice. */
  takeaway: string
  /** Additional images — appended below the hero cover on the detail page. */
  gallery: string[]
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
    image: UNSPLASH('photo-1542291026-7eec264c27ff'),
    href: 'https://nexvend.com',
    client: 'Nexvend',
    industry: 'Smart vending & retail tech',
    services: ['UX Strategy', 'UI Design', 'UX Copywriting', 'Design Systems', 'Webflow Build'],
    description:
      "Nexvend operates a network of smart vending machines across high-traffic Southeast Asian retail spaces. They came to AFO with a problem familiar to most B2B hardware companies: a homepage that talked about machines instead of outcomes. We rebuilt the marketing site as a focused sales tool — one that turns curiosity into qualified demos within three clicks.",
    process: [
      {
        heading: 'Hearing the real pitch',
        body:
          "We started where every honest project starts: shadowing the sales team on three live calls. The product wasn't the bottleneck — the pitch was. Buyers cared about uptime, margin per square meter, and operator support; the old site barely mentioned any of it. We turned that conversation into a content brief and a single-question heuristic: would a property manager ten seconds in understand what they get and what it costs them?",
      },
      {
        heading: 'Sharpening the story',
        body:
          'Nexvend\'s biggest asset was its operating model, not its hardware. So we led with the model: a "machine + maintenance + restock" subscription priced per location. We rewrote the hero, the three-up benefits row, and the case-study cards together — every block earned its place by answering an objection we\'d heard in the field. Acid yellow became the call-to-action color so eye flow always pointed home: book a demo.',
      },
      {
        heading: 'Designing for the seven-second skim',
        body:
          'Most B2B sites bury the proof. We surfaced it. Above the fold: live machine count, monthly transactions, and a logo strip of current operators. Below it: a sticky "request a site survey" pill that follows the scroll. The product page collapsed to one scrollable canvas — overview, specs, install timeline, FAQ — so a property manager can forward a single URL to their team without losing context.',
      },
      {
        heading: 'Building it to ship in 8 weeks',
        body:
          "We built the site directly in Webflow on top of a token-driven design system. Sales can swap stats, screenshots, and case studies without touching code. We wired tracking and lead forms to HubSpot so the marketing team finally has attribution back to ad spend — and the engineering team didn't have to lift a finger.",
      },
    ],
    results: [
      { metric: '+62%', label: 'Demo requests within the first month' },
      { metric: '8 weeks', label: 'Design phase to launch' },
      { metric: '< 1.8s', label: 'Largest contentful paint, p75' },
    ],
    takeaway:
      "B2B hardware companies don't lose deals on price — they lose them on clarity. Nexvend's machines hadn't changed; the story around them had. Sometimes the highest-leverage redesign is the one that just tells the truth, loudly.",
    gallery: [
      UNSPLASH('photo-1556761175-5973dc0f32e7'),
      UNSPLASH('photo-1551434678-e076c223a692'),
      UNSPLASH('photo-1518770660439-4636190af475'),
    ],
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
    image: UNSPLASH('photo-1505740420928-5e560c06d30e'),
    href: 'https://charmrise-project.vercel.app/',
    client: 'Charmrise',
    industry: 'SaaS · Sales enablement',
    services: ['UX Research', 'UI Design', 'UX Copywriting', 'Motion', 'Design Systems'],
    description:
      "Charmrise sells a CRM built for small sales teams who outgrew spreadsheets but can't justify Salesforce. Their product worked. Their landing page didn't — it asked visitors to read three paragraphs before reaching a feature image. We rebuilt the site around one promise: sign up, import contacts, send your first sequence in under ten minutes.",
    process: [
      {
        heading: 'Finding the ten-minute moment',
        body:
          "We interviewed eight existing customers and ran a five-second test on the live site. The pattern was unmistakable: every happy user remembered the moment their first email sequence sent successfully. We anchored the entire site around that aha — pricing copy, feature pages, the demo video — so the marketing always pointed at the same finish line as the product.",
      },
      {
        heading: 'Replacing screenshots with proof',
        body:
          'Most CRM landing pages show dashboards. Dashboards photograph well and convince no one. We replaced them with annotated micro-flows — three-frame sequences showing how a real user takes a contact from cold lead to closed-won inside Charmrise. Each annotation cites a metric: "8 sec to log a call", "1 click to start a sequence", "0 fields required". Specificity beats polish.',
      },
      {
        heading: 'Designing the system, not the page',
        body:
          'We knew the marketing team would ship dozens of feature pages over the next year, so we built the site as a kit of parts — hero variants, feature blocks, social-proof rows, FAQ accordions — all driven by tokens. A new feature page now takes 90 minutes to publish instead of three days. The design system lives in Figma and Storybook in parallel so design and engineering see the same truth.',
      },
      {
        heading: 'Tuning for trust, not hype',
        body:
          'Sales-tech websites can read like used-car ads. We did the opposite — calm typography, generous whitespace, a single accent color, no exclamation marks. The pricing page leads with what\'s INCLUDED, not what\'s missing from the tier below. Charmrise\'s buyers are already cynical about CRM marketing; the most disruptive thing we could do was sound honest.',
      },
    ],
    results: [
      { metric: '+38%', label: 'Free-trial conversion vs the old site' },
      { metric: '2.4×', label: 'Pricing-page → checkout rate' },
      { metric: '14 weeks', label: 'End-to-end design + build' },
    ],
    takeaway:
      "We didn't add anything fancy. We just removed friction every single screen until 'try the product' felt easier than 'read about the product'. That's the whole brief for any SaaS marketing site, and it's almost never executed cleanly.",
    gallery: [
      UNSPLASH('photo-1551288049-bebda4e38f71'),
      UNSPLASH('photo-1460925895917-afdab827c52f'),
      UNSPLASH('photo-1556761175-5973dc0f32e7'),
    ],
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
    client: 'Macrons Academy',
    industry: 'EdTech · Web3',
    services: ['UX Research', 'UI Design', 'UX Copywriting', 'Brand Refresh', 'Webflow Build'],
    description:
      "Macrons Academy teaches crypto fundamentals to mainstream learners — people who are curious but burned by jargon. Their existing site looked like every other trading platform: hexagons, charts, glowing tickers. We rebuilt it as a school first and a crypto site second, so first-time visitors feel taught instead of sold.",
    process: [
      {
        heading: 'Auditing the trust deficit',
        body:
          "Crypto's biggest design problem isn't aesthetic, it's credibility. We started by stripping every visual cliché from the moodboard — no neon, no isometric coins, no hexagons. In its place: warm yellows, classical type, a tone that sounds like a confident lecturer, not a hype account. The goal was to look like a school that happened to teach crypto, not a crypto company that happened to teach.",
      },
      {
        heading: 'Mapping the curriculum to the page',
        body:
          'We restructured the site around three reader states — "I\'m curious", "I\'m enrolled", "I\'m teaching". Each gets its own track and call-to-action. The homepage now functions as a syllabus: foundations, intermediate, advanced, plus a free starter module that proves teaching quality before asking for a credit card.',
      },
      {
        heading: 'Designing the proof layer',
        body:
          "Education buyers want two things: who teaches it, and what other learners got out of it. We built dedicated instructor pages with real bios and recorded sample lessons, plus a testimonial format that names the student's career outcome instead of generic praise. The free starter module doubles as proof — finish it and you've already learned something concrete.",
      },
      {
        heading: 'Shipping fast without cutting corners',
        body:
          "Eight weeks isn't a lot of time for a brand + site + content overhaul. We held the line on a tight component library, ran weekly Friday demos with the founder, and locked copy in week three so production could fly. The result launched on time with a sub-1.5s LCP and a Lighthouse accessibility score of 98.",
      },
    ],
    results: [
      { metric: '+47%', label: 'Course enrollment in the first quarter' },
      { metric: '98/100', label: 'Lighthouse accessibility score' },
      { metric: '8 weeks', label: 'Concept to launched site' },
    ],
    takeaway:
      "The crypto category trained us to expect hostile design — busy, loud, hard to trust. Macrons gets to win by being the calm one in the room. Sometimes a category's worst habit is the easiest moat to walk around.",
    gallery: [
      UNSPLASH('photo-1639762681057-408e52192e55'),
      UNSPLASH('photo-1518186285589-2f7649de83e0'),
      UNSPLASH('photo-1621761191319-c6fb62004040'),
    ],
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
    client: 'Sorlys Eindom',
    industry: 'Architecture · Real estate',
    services: ['UX Strategy', 'UI Design', 'Editorial Direction', 'Photography Art Direction', 'CMS Build'],
    description:
      "Sorlys Eindom is a Scandinavian architecture studio whose work is photographed beautifully and presented terribly. Their old portfolio buried every project under a navigation maze. We rebuilt the site as a single, unhurried gallery — one where each project gets the space its photography deserves and the studio's voice carries between them.",
    process: [
      {
        heading: 'Letting the images run the page',
        body:
          "Most agency sites compete with their own work. We did the inverse — pared the chrome to almost nothing so every page reads like a magazine spread. The typography sits at the corners, the imagery owns the center, and the whole composition leans on whitespace instead of decoration. The work has to earn the visitor's time, which it does.",
      },
      {
        heading: 'Building a story scaffold for every project',
        body:
          "We worked with the studio's writers to standardize each case study around four beats — site, brief, decisions, result. Same skeleton, very different stories. It turned a haphazard catalogue of past work into a curated archive that reads like the studio is teaching you how to look at architecture, not just selling it.",
      },
      {
        heading: 'Slowing the scroll on purpose',
        body:
          "We added quiet, intentional motion — images that crossfade as you advance, captions that anchor before paragraphs reveal. Nothing flashy, but the cumulative effect is that visitors slow down. Average time on a project page tripled. For an architecture studio, that matters more than any conversion metric.",
      },
      {
        heading: 'Handing over a CMS that the team will actually use',
        body:
          "The previous site was built in a template the team never touched. We migrated to Sanity with a content model designed around how the studio actually files projects — site address, year, lead architect, photographer credit, lessons. Publishing a new project now takes under an hour and looks identical to the launch design.",
      },
    ],
    results: [
      { metric: '3.1×', label: 'Average time on project pages' },
      { metric: '+58%', label: 'Inbound briefs in the first six months' },
      { metric: '12 weeks', label: 'Design + content + CMS build' },
    ],
    takeaway:
      "The lesson Sorlys taught us: a portfolio site doesn't need to convince anyone. It needs to deserve to be read. When the design gets out of the way, good work becomes its own argument.",
    gallery: [
      UNSPLASH('photo-1503387762-cf12a83a9bdf'),
      UNSPLASH('photo-1480714378408-67cf0d13bc1b'),
      UNSPLASH('photo-1493809842364-78817add7ffb'),
    ],
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
    client: 'Family Garden Inn',
    industry: 'Hospitality · Boutique hotel',
    services: ['UX Strategy', 'UI Design', 'UX Copywriting', 'Booking Integration', 'CMS Build'],
    description:
      "Family Garden Inn is a 14-room family-run inn outside Austin, Texas. The owners came to us with a working but unloved Squarespace site, a beautiful property, and a hunch that more guests were dropping off at booking than they realized. We redesigned the site to do exactly two things: make the place feel like home before you arrive, and let you book a room in under a minute.",
    process: [
      {
        heading: 'Capturing what the photos can\'t',
        body:
          "We spent two days at the inn before opening Figma — slept there, ate the breakfast, talked to repeat guests. The thing that makes the place special isn't the rooms; it's the owners' hospitality. We rewrote the entire site in the voice of a friend recommending the place, not a hotel pitching itself. The hero copy is literally a paragraph from a guest review we asked permission to use.",
      },
      {
        heading: 'Building the booking flow honestly',
        body:
          "Most independent hotel sites borrow OTA aesthetics — sterile cards, fake urgency, dark patterns. We did the opposite. The room cards show the actual photos guests will see when they walk in, the calendar shows true price (no \"resort fee\" surprises), and the checkout has one screen, not five. The booking widget is a custom skin over the existing Mews API — feels like the rest of the site, behaves like the existing system.",
      },
      {
        heading: 'Showing the property like a photo essay',
        body:
          'We replaced the old "rooms / amenities / dining" tabs with a long-scroll photo essay broken into times of day — morning, afternoon, evening, late night. It mirrors how a guest actually experiences the property, and it works much harder than a feature list at communicating mood. The owners report that booking inquiries quote specific photos by description.',
      },
      {
        heading: 'Designing for the phone, not the desk',
        body:
          "85% of bookings start on a phone, often while traveling or planning over coffee. We designed mobile-first, kept hero images under 200KB, and made sure the booking widget never required typing into more than two fields. The full site weighs under 600KB on the home page and scores a 99 on Lighthouse performance.",
      },
    ],
    results: [
      { metric: '+71%', label: 'Direct bookings in the first quarter post-launch' },
      { metric: '−42%', label: 'Drop-off between room view and checkout' },
      { metric: '99/100', label: 'Lighthouse mobile performance' },
    ],
    takeaway:
      "Small hospitality brands win by feeling personal in a category that has gone industrial. Family Garden's owners didn't need a slicker hotel website — they needed the website to sound like them. Once we got that right, the booking metrics took care of themselves.",
    gallery: [
      UNSPLASH('photo-1582719508461-905c673771fd'),
      UNSPLASH('photo-1571003123894-1f0594d2b5d9'),
      UNSPLASH('photo-1566073771259-6a8506099945'),
    ],
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

// ---------- Founders (used on the /studio About page) ------------------

export type Founder = {
  name: string
  role: string
  /** Portrait image URL (1:1.3-ish portrait orientation works best). */
  portrait: string
  /** Accent color used as a subtle highlight in the card. */
  accent?: string
}

export const founders: Founder[] = [
  {
    name: 'Gerald Mamengko',
    role: 'Founder',
    portrait: UNSPLASH('photo-1507003211169-0a1dd7228f2d', 800),
    accent: '#D6FF3D',
  },
  {
    name: 'Kurniawan Nugraha',
    role: 'Co-founder',
    portrait: UNSPLASH('photo-1494790108377-be9c29b29330', 800),
    accent: '#FF7A3D',
  },
]

// ---------- The studio's origin story ----------------------------------

export const journey = {
  eyebrow: 'Our story',
  /** Short tagline above the paragraphs. */
  lead: 'Why we built AFO.',
  /** Multi-paragraph narrative. */
  story: [
    "AFO didn't start as a studio. It started as a side project — two friends moonlighting on a brand identity for a third friend's coffee shop, after the day jobs were done. The project shipped late and over budget. The coffee shop is still open.",
    "What we learned that month became the brief for the whole studio: the best work happens when strategy, design, and engineering aren't separated by a Slack handoff. When the same small group sees the entire thing from sketch to commit. After Office is a literal description — we built it after-hours, between deadlines, around real lives.",
    "Three years later we're still small on purpose. Two of us full-time, a handful of trusted collaborators, two to three projects a quarter. The size is the point. It's how we keep the founder close enough to every screen that gets shipped, and how we keep the work honest enough to put our names on.",
  ],
  /** Milestone moments. Each gets a year + short label. */
  milestones: [
    { year: '2022', label: 'First side project lands. Coffee shop opens.' },
    { year: '2023', label: 'AFO becomes a name. First retainer signs.' },
    { year: '2024', label: 'Five projects shipped. First international client.' },
    { year: '2025', label: 'Two-person studio, twelve cases live, more in flight.' },
  ],
}

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
