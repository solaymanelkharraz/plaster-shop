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
      <nav className="fixed w-full z-50 top-0 border-b border-white/40 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 z-50">
            STUDIO<span className="text-slate-800">PLASTER</span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 font-medium text-sm items-center">
            <Link to="/" className="text-slate-600 hover:text-violet-600 transition-colors">Home</Link>
            <Link to="/collection" className="text-slate-600 hover:text-violet-600 transition-colors">Collection</Link>
            <Link to="/admin" className="text-slate-400 hover:text-indigo-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-white shadow-sm">Admin Panel</Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-slate-800 z-50 p-2 bg-white/50 rounded-full border border-white shadow-sm"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed inset-0 z-40 bg-slate-50/95 backdrop-blur-xl pt-28 px-6 flex flex-col gap-6 md:hidden"
          >
            <Link onClick={() => setIsOpen(false)} to="/" className="text-3xl font-black text-slate-800 border-b border-slate-200 pb-4">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/collection" className="text-3xl font-black text-slate-800 border-b border-slate-200 pb-4">Collection</Link>
            <Link onClick={() => setIsOpen(false)} to="/admin" className="text-3xl font-black text-violet-600 mt-auto mb-12">Admin Access &rarr;</Link>
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
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative selection:bg-violet-300">
        
        {/* Background Glowing Blobs (Optimized for Mobile) */}
        <div className="fixed top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-60 animate-[spin_20s_linear_infinite] -z-10"></div>
        <div className="fixed top-[20%] right-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-rose-300 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-60 animate-[pulse_8s_ease-in-out_infinite] -z-10"></div>
        <div className="fixed bottom-[-10%] left-[20%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-60 -z-10"></div>

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