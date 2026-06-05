import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from './routes/Home'
import Work from './routes/Work'
import ProjectDetail from './routes/ProjectDetail'
import Studio from './routes/Studio'
import Contact from './routes/Contact'

/**
 * Wrapper that re-keys ProjectDetail on every slug change so the
 * "next project" Link triggers a clean unmount + mount instead of
 * a same-instance re-render (which preserves Lenis scroll position
 * and makes the navigation feel broken).
 */
function ProjectDetailRoute() {
  const { slug } = useParams<{ slug: string }>()
  return <ProjectDetail key={slug} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectDetailRoute />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
