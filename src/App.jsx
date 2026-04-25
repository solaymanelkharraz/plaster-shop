import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Landing from './pages/Landing'
import Collection from './pages/Collection'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Router>
      {/* Vibrant Animated Background */}
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative selection:bg-violet-300">
        
        {/* Background Glowing Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-rose-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>

        {/* Glassmorphism Navbar */}
        <nav className="fixed w-full z-50 top-0 border-b border-white/40 bg-white/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              STUDIO<span className="text-slate-800">PLASTER</span>
            </Link>
            <div className="flex gap-8 font-medium text-sm">
              <Link to="/" className="text-slate-600 hover:text-violet-600 transition-colors">Home</Link>
              <Link to="/collection" className="text-slate-600 hover:text-violet-600 transition-colors">Collection</Link>
              <Link to="/admin" className="text-slate-400 hover:text-indigo-600 transition-colors">Admin Panel</Link>
            </div>
          </div>
        </nav>

        {/* Page Content goes here */}
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