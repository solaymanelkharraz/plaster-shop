import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function Store() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
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
    fetchProducts()
  }, [])

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
  }

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
  }

  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] bg-[#EBE9E4] flex items-center justify-center">
        <span className="text-zinc-400 tracking-[0.3em] uppercase text-sm animate-pulse font-bold">
          Loading Studio...
        </span>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="h-[calc(100vh-80px)] bg-[#EBE9E4] flex items-center justify-center text-zinc-500">
        No pieces available. Please upload from the Admin dashboard.
      </div>
    )
  }

  const activeProduct = products[currentIndex]

  return (
    // We calculate 100vh minus the Navbar height so there is ZERO vertical scrolling
    <div className="h-[calc(100vh-80px)] bg-[#EBE9E4] text-zinc-900 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Left Panel: Typography & Details */}
      <div className="w-full md:w-[45%] h-full flex flex-col justify-between px-8 py-12 md:px-16 md:py-20 z-10 relative">
        
        {/* Top: Counter */}
        <div className="font-mono text-sm text-zinc-500 tracking-widest border-b border-zinc-300 pb-4">
          No. {String(currentIndex + 1).padStart(2, '0')} — {String(products.length).padStart(2, '0')}
        </div>

        {/* Middle: Product Info */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                {activeProduct.name}
              </h1>
              <p className="text-lg text-zinc-600 font-light max-w-sm mb-12 leading-relaxed">
                {activeProduct.description}
              </p>
              
              <div className="flex items-center gap-6 mb-12">
                <span className="text-3xl font-medium tracking-tight">
                  ${activeProduct.price}
                </span>
                <button 
                  onClick={() => alert(`Added ${activeProduct.name} to cart`)}
                  className="bg-zinc-900 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors"
                >
                  Acquire Piece
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom: Navigation Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={prevProduct}
            className="w-14 h-14 rounded-full border border-zinc-400 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={nextProduct}
            className="w-14 h-14 rounded-full border border-zinc-400 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Right Panel: The Massive Image Slider */}
      <div className="hidden md:block w-[55%] h-full relative bg-zinc-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {activeProduct.image_url ? (
              <img 
                src={activeProduct.image_url} 
                alt={activeProduct.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 font-mono text-sm">
                Awaiting Image Asset
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}