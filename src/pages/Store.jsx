import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { motion } from 'framer-motion'

export default function Store() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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

  // Animation settings for a smooth, premium feel
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 pb-24 font-sans">
      
      {/* Warm, Minimalist Hero Section */}
      <div className="relative overflow-hidden border-b border-stone-200 bg-[#F9F8F3]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 lg:py-28 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-stone-900 mb-6">
              Handcrafted Plaster Decor
            </h1>
            <p className="text-stone-500 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
              Poured, cured, and sanded by hand. Bring raw, earthy textures and minimalist forms into your space.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        <div className="flex justify-between items-end mb-10 border-b border-stone-200 pb-4">
          <h2 className="text-2xl font-medium text-stone-900">Current Collection</h2>
          <span className="text-stone-400 text-sm">{products.length} Items</span>
        </div>

        {loading ? (
           <div className="flex justify-center py-20 text-stone-400 tracking-widest text-sm uppercase animate-pulse">
             Loading Collection...
           </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {products.length === 0 ? (
              <div className="col-span-full text-center text-stone-400 p-12 border border-dashed border-stone-300 rounded-2xl">
                No products found. Head to the Admin Dashboard to upload your first piece!
              </div>
            ) : (
              products.map((product) => (
                 <motion.div 
                   variants={itemVariants}
                   key={product.id} 
                   className="group flex flex-col"
                 >
                   {/* Image Container with subtle zoom */}
                   <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 mb-5 relative rounded-sm">
                     {product.image_url ? (
                       <img 
                         src={product.image_url} 
                         alt={product.name} 
                         className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                     ) : (
                       <div className="flex h-full items-center justify-center text-stone-400 text-sm">
                         No Image Available
                       </div>
                     )}
                     
                     {/* Hover Add to Cart Button */}
                     <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <button 
                          onClick={() => alert('Added to cart prototype!')}
                          className="w-full bg-white/95 backdrop-blur-sm text-stone-900 py-3 text-sm font-medium shadow-sm hover:bg-stone-900 hover:text-white transition-colors"
                        >
                          Quick Add
                        </button>
                     </div>
                   </div>

                   {/* Product Info */}
                   <div className="flex justify-between items-start">
                     <div>
                       <h3 className="text-lg font-medium text-stone-900">{product.name}</h3>
                       <p className="text-sm text-stone-500 mt-1 line-clamp-2 pr-4 font-light">
                         {product.description}
                       </p>
                     </div>
                     <p className="text-lg text-stone-900">${product.price}</p>
                   </div>
                 </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}