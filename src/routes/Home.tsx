import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Intro } from '../components/Intro'
import { WorkTeaser } from '../components/WorkTeaser'
import { LightShowcase } from '../components/LightShowcase'
import { Services } from '../components/Services'
import { Marquee } from '../components/Marquee'
import { Testimonials } from '../components/Testimonials'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { values } from '../data/site'

export default function Home() {
  useSmoothScroll()

  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Intro />
      <WorkTeaser />
      <LightShowcase />
      <Services />

      <div className="py-10 lg:py-14 text-sm uppercase tracking-[0.3em] text-bone/40">
        <Marquee items={values} speed={45} reverse />
      </div>

      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
