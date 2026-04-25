import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { motion } from 'framer-motion'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error.message)
    } finally {
      setLoading(false)
    }
  }

  // Animation variants for that smooth staggered loading effect
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 md:p-16 selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-24 text-center relative"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 uppercase">
          Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Plaster</span>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-lg md:text-xl font-light">
          Redefining space. Handcrafted architectural forms for the modern aesthetic.
        </p>
      </motion.header>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-indigo-400 tracking-[0.3em] text-sm uppercase font-bold"
          >
            Initializing System...
          </motion.div>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {products.length === 0 ? (
            <div className="col-span-full text-center text-zinc-600 border border-zinc-800/50 rounded-2xl p-12 bg-zinc-900/20 backdrop-blur-sm">
              Database is currently empty. Initialize product load via Supabase.
            </div>
          ) : (
            products.map((product) => (
              <motion.div 
                variants={itemVariants}
                key={product.id} 
                className="group relative flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-4 overflow-hidden hover:border-indigo-500/30 transition-colors duration-500"
              >
                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-zinc-800/50 mb-6 relative">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-700">
                      Awaiting Asset
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex justify-between items-end px-2 pb-2">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-2 line-clamp-2 pr-4 font-light">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-xl font-mono text-indigo-400">
                      ${product.price}
                    </p>
                    {/* Neon Hover Button */}
                    <button 
                      onClick={() => alert('Add to cart sequence initiated')}
                      className="rounded-full bg-zinc-800 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300"
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  )
}

export default App