import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Work from './routes/Work'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </BrowserRouter>
  )
}
