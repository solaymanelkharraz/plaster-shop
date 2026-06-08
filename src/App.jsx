import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Landing from './pages/Landing'
import Collection from './pages/Collection'
import Admin from './pages/Admin'

// --- RESPONSIVE NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed w-full z-50 top-0 border-b border-stone-200/40 bg-[#F4F2EE]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="text-xl font-light tracking-[0.25em] text-stone-800 font-serif z-50">
            ALMA <span className="text-stone-400 italic font-light">CANDLES</span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 font-light text-xs tracking-widest uppercase items-center">
            <Link to="/" className="text-stone-600 hover:text-stone-900 transition-colors">Home</Link>
            <Link to="/collection" className="text-stone-600 hover:text-stone-900 transition-colors">Collection</Link>
            <Link to="/admin" className="text-stone-400 hover:text-stone-800 transition-colors bg-white/40 px-4 py-2 rounded-full border border-stone-200/60 shadow-sm">Admin</Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-stone-800 z-50 p-2 bg-white/40 rounded-full border border-stone-200/60 shadow-sm"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#F4F2EE]/98 backdrop-blur-xl pt-28 px-6 flex flex-col gap-6 md:hidden font-serif"
          >
            <Link onClick={() => setIsOpen(false)} to="/" className="text-3xl font-light text-stone-800 border-b border-stone-200/40 pb-4 tracking-wide">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/collection" className="text-3xl font-light text-stone-800 border-b border-stone-200/40 pb-4 tracking-wide">Collection</Link>
            <Link onClick={() => setIsOpen(false)} to="/admin" className="text-2xl font-light italic text-stone-500 mt-auto mb-12">Admin Portal &rarr;</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// --- MAIN APP ENTRY ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-warm-beige font-sans text-stone-800 overflow-x-hidden relative selection:bg-stone-200/60">
        <Navbar />

        {/* Page Content */}
        <div className="relative z-10 pt-20">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}