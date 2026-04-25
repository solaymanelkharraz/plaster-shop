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
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-16">
      
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-4">The Collection</h1>
        <p className="text-slate-600 font-medium">Browse our vibrant architectural pieces.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-violet-600 font-bold tracking-widest uppercase animate-pulse">
          Syncing Database...
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {products.map((product) => (
            <motion.div 
              variants={itemVariants}
              key={product.id} 
              className="group bg-white/40 backdrop-blur-xl border border-white/60 p-4 rounded-[2rem] shadow-lg hover:shadow-2xl hover:bg-white/60 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="aspect-square w-full overflow-hidden rounded-[1.5rem] bg-slate-100 mb-6 relative">
                {product.image_url && (
                  <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                )}
                
                {/* Floating Price Tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm font-bold text-slate-900">
                  ${product.price}
                </div>
              </div>

              {/* Product Details */}
              <div className="px-2 pb-2">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-sm text-slate-600 mb-6 line-clamp-2">{product.description}</p>
                
                <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-md hover:bg-violet-600 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}