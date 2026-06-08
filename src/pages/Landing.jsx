import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 md:px-12 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Serif Typography & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left mt-8 lg:mt-0"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-stone-200/60 text-stone-600 font-light text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-6 shadow-sm">
            Hand-Poured Soy Candles
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light font-serif tracking-tight leading-[1.05] text-stone-900 mb-6 lg:mb-8">
            Light. <br className="hidden sm:block"/>
            <span className="italic font-normal text-stone-500">
              Calm.
            </span> <br className="hidden sm:block"/>
            Essence.
          </h1>
          
          <p className="text-base sm:text-lg text-stone-600 font-light max-w-md mx-auto lg:mx-0 mb-3 leading-relaxed">
            Crafted for moments of stillness. Hand-poured relaxing candles designed to bring warmth and peace to your spaces.
          </p>
          <p className="text-sm sm:text-base text-stone-400 font-serif italic max-w-md mx-auto lg:mx-0 mb-8 lg:mb-10">
            شموع طبيعية مهدئة، مصممة بحب لتضفي السكينة والدفء على منزلك.
          </p>
          
          <Link to="/collection">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-stone-900 text-white px-10 py-4 sm:py-5 rounded-xl font-light tracking-widest uppercase transition-all duration-300 text-xs sm:text-sm hover:bg-stone-800 shadow-sm"
            >
              Explore Collection
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Side: Floating Elegant Images */}
        <div className="relative h-[400px] sm:h-[500px] w-full flex justify-center items-center">
          
          {/* Main Mobile/Desktop Image */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute lg:top-0 lg:right-10 w-[70%] sm:w-[300px] lg:w-[350px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/80 shadow-2xl z-20"
          >
            <img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop" alt="Relaxing Candle" className="w-full h-full object-cover" />
          </motion.div>

          {/* Background Floating Image */}
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="hidden sm:block absolute bottom-0 lg:bottom-10 left-0 lg:left-0 w-[200px] lg:w-[250px] aspect-square rounded-2xl overflow-hidden border border-white/80 shadow-xl z-10"
          >
            <img src="https://images.unsplash.com/photo-1602872030219-cbf918b52a9f?q=80&w=600&auto=format&fit=crop" alt="Warm Flame" className="w-full h-full object-cover" />
          </motion.div>

          {/* Minimal Floating Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-10 sm:top-20 left-4 sm:left-10 bg-white/80 backdrop-blur-md border border-stone-200/60 p-4 sm:p-6 rounded-xl shadow-xl z-30"
          >
            <p className="text-2xl sm:text-3xl font-light font-serif text-stone-800">100%</p>
            <p className="text-[10px] sm:text-xs font-light text-stone-500 uppercase tracking-widest">Natural Wax</p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}