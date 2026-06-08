import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { motion } from 'framer-motion'

export default function Collection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (data) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-16">
      
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-light font-serif tracking-wide text-stone-900 mb-4">The Collection</h1>
        <p className="text-stone-500 font-light max-w-md mx-auto">Browse our relaxing hand-poured candle collection, designed to calm your senses.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-stone-400 font-light tracking-widest uppercase animate-pulse text-xs">
          Loading Collection...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-stone-500 font-light">
          No candles in the inventory yet. Visit the Admin panel to add some!
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {products.map((product) => (
            <motion.div 
              variants={itemVariants}
              key={product.id} 
              className="group bg-cream border border-stone-200/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Product Image */}
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-stone-50 mb-6 relative border border-stone-200/40">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-50 flex items-center justify-center text-stone-400 text-xs font-light">
                    No Image Available
                  </div>
                )}
                
                {/* Floating Price Tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm text-xs font-medium tracking-wide text-stone-800 border border-stone-200/50">
                  {product.price} MAD
                </div>
              </div>

              {/* Product Details */}
              <div className="px-1 pb-1">
                <h3 className="text-lg font-normal font-serif text-stone-900 mb-2">{product.name}</h3>
                <p className="text-xs text-stone-500 font-light mb-6 line-clamp-2 h-8 leading-relaxed">{product.description}</p>
                
                <a 
                  href={`https://wa.me/212767410434?text=${encodeURIComponent(`Hello! I would like to order the candle: ${product.name} / مرحباً، أود طلب شمعة: ${product.name}`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-xl font-medium tracking-wide transition-all duration-300 text-xs shadow-sm hover:shadow-md cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.364a9.92 9.92 0 0 0 4.804 1.237h.006c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.18-2.92-7.061A9.925 9.925 0 0 0 12.012 2zm5.72 14.102c-.314.877-1.542 1.612-2.128 1.688-.567.074-1.127.357-3.64-.678-3.216-1.325-5.276-4.606-5.437-4.82-.16-.213-1.285-1.708-1.285-3.26 0-1.55 1.812-2.312 2.05-2.526.237-.214.398-.268.526-.268.127 0 .254.004.364.01.125.006.29.023.447.406.182.443.626 1.527.68 1.638.055.11.09.238.018.384-.073.146-.11.238-.218.366-.11.128-.23.284-.328.38-.11.108-.227.226-.09.46.136.232.607.997 1.3 1.616.892.797 1.644 1.044 1.88 1.162.237.119.375.1.511-.055.137-.156.59-.687.746-.922.157-.235.314-.197.527-.119.213.08 1.348.636 1.577.75.23.115.38.17.437.268.057.098.057.567-.257 1.444z"/>
                  </svg>
                  <span>Order via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}