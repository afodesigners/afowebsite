import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Work from './routes/Work'
import Studio from './routes/Studio'
import Contact from './routes/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
