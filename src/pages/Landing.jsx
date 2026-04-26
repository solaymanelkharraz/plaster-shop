import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 md:px-12 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Heavy Typography & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left mt-8 lg:mt-0"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-violet-700 font-bold text-[10px] sm:text-xs tracking-widest uppercase mb-6 shadow-sm">
            Next-Gen Decor
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-slate-900 mb-6 lg:mb-8 shadow-sm">
            Color. <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
              Texture.
            </span> <br className="hidden sm:block"/>
            Form.
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-md mx-auto lg:mx-0 mb-8 lg:mb-10 leading-relaxed">
            We combined raw architectural plaster with vibrant, modern energy. Poured by hand, designed for the future.
          </p>
          
          <Link to="/collection">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 sm:py-5 rounded-2xl font-bold tracking-wide shadow-[0_20px_40px_-10px_rgba(76,29,149,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(76,29,149,0.8)] transition-shadow text-sm sm:text-base"
            >
              Explore Collection
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Side: Floating Interactive Images */}
        <div className="relative h-[400px] sm:h-[500px] w-full flex justify-center items-center">
          
          {/* Main Mobile/Desktop Image */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute lg:top-0 lg:right-10 w-[70%] sm:w-[300px] lg:w-[350px] aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white/40 shadow-2xl z-20"
          >
            <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop" alt="Plaster Art" className="w-full h-full object-cover" />
          </motion.div>

          {/* Background Floating Image (Hidden on very small mobile, visible on tablet/desktop) */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="hidden sm:block absolute bottom-0 lg:bottom-10 left-0 lg:left-0 w-[200px] lg:w-[250px] aspect-square rounded-[2rem] overflow-hidden border-4 border-white/40 shadow-xl z-10"
          >
            <img src="https://images.unsplash.com/photo-1615529182904-14819c35d55b?q=80&w=600&auto=format&fit=crop" alt="Tray" className="w-full h-full object-cover" />
          </motion.div>

          {/* Glass floating card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-10 sm:top-20 left-4 sm:left-10 bg-white/70 backdrop-blur-xl border border-white/50 p-4 sm:p-6 rounded-2xl shadow-xl z-30"
          >
            <p className="text-2xl sm:text-3xl font-black text-violet-600">100%</p>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Hand-Poured</p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}