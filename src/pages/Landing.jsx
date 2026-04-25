import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 md:px-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Heavy Typography & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-violet-700 font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
            Next-Gen Decor
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-8 shadow-sm">
            Color. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
              Texture.
            </span> <br/>
            Form.
          </h1>
          <p className="text-lg text-slate-700 font-medium max-w-md mb-10 leading-relaxed">
            We combined raw architectural plaster with vibrant, modern energy. Poured by hand, designed for the future.
          </p>
          
          <Link to="/collection">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold tracking-wide shadow-[0_20px_40px_-10px_rgba(76,29,149,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(76,29,149,0.8)] transition-shadow"
            >
              Explore Collection
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Side: Floating Interactive Images */}
        <div className="relative h-[500px] hidden md:block">
          {/* Main Floating Image */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-0 right-10 w-[350px] aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white/40 shadow-2xl z-20"
          >
            <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop" alt="Plaster Art" className="w-full h-full object-cover" />
          </motion.div>

          {/* Background Floating Image */}
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute bottom-10 left-0 w-[250px] aspect-square rounded-[2rem] overflow-hidden border-4 border-white/40 shadow-xl z-10"
          >
            <img src="https://images.unsplash.com/photo-1615529182904-14819c35d55b?q=80&w=600&auto=format&fit=crop" alt="Tray" className="w-full h-full object-cover" />
          </motion.div>

          {/* Glass floating card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-20 left-10 bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-xl z-30"
          >
            <p className="text-3xl font-black text-violet-600">100%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hand-Poured</p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}