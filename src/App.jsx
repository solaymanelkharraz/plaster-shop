import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { supabase } from './supabase'
import { motion } from 'framer-motion'
import { ShoppingBag, LayoutDashboard, Menu } from 'lucide-react'

// --- 1. NAVBAR COMPONENT ---
const Navbar = () => (
  <nav className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
    <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
      <Link to="/" className="text-2xl font-black tracking-tighter text-white uppercase flex items-center gap-2">
        <div className="w-6 h-6 bg-indigo-500 rounded-sm rotate-45 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
        Studio<span className="text-indigo-400">Plaster</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <Link to="/" className="hover:text-white transition-colors">Store</Link>
        <Link to="/dashboard" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
          <LayoutDashboard size={16} /> Admin
        </Link>
        <button className="relative p-2 text-zinc-300 hover:text-white transition-colors">
          <ShoppingBag size={20} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">0</span>
        </button>
      </div>
      <button className="md:hidden text-zinc-300"><Menu size={24} /></button>
    </div>
  </nav>
)

// --- 2. MAIN STOREFRONT VIEW ---
const Storefront = ({ products, loading }) => {
  return (
    <div className="pb-24">
      {/* High-End Hero Section */}
      <div className="relative overflow-hidden border-b border-zinc-800/50 bg-zinc-900/20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold tracking-widest uppercase">
              New Collection Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-tight">
              Shape Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Environment.</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-light mb-10 max-w-lg mx-auto lg:mx-0">
              Hand-poured, architectural plaster decor designed to bring raw, minimalist textures into modern spaces.
            </p>
            <button className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black hover:bg-indigo-400 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]">
              Explore Catalog
            </button>
          </motion.div>

          {/* Featured Hero Product Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-700/50 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1615529182904-14819c35d55b?q=80&w=1200&auto=format&fit=crop" 
                alt="Featured Plaster Tray" 
                className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Speckled Jesmonite Tray</p>
                  <p className="text-zinc-400 text-sm">Featured Piece</p>
                </div>
                <p className="text-indigo-400 font-mono font-bold text-xl">$24.00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">Full Catalog</h2>
          <span className="text-zinc-500 text-sm">{products.length} Items</span>
        </div>

        {loading ? (
           <div className="flex justify-center py-20 text-indigo-400 tracking-[0.3em] text-sm uppercase font-bold animate-pulse">
             Loading Database...
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
               <div key={product.id} className="group flex flex-col bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-3 hover:border-indigo-500/40 transition-colors duration-500">
                 <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-800/50 mb-4 relative">
                   {product.image_url && (
                     <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"/>
                   )}
                 </div>
                 <div className="px-2 pb-2">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="text-lg font-bold text-zinc-100">{product.name}</h3>
                     <p className="text-lg font-mono text-indigo-400">${product.price}</p>
                   </div>
                   <button className="w-full rounded-xl bg-zinc-800/80 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors duration-300">
                     Add to Cart
                   </button>
                 </div>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// --- 3. ADMIN DASHBOARD PLACEHOLDER ---
const Dashboard = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-zinc-400 mt-1">Manage products, inventory, and uploads.</p>
      </div>
      <button className="rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-400 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)]">
        + Add New Product
      </button>
    </div>
    
    <div className="border border-dashed border-zinc-800 rounded-3xl p-20 flex items-center justify-center bg-zinc-900/20">
      <p className="text-zinc-500 font-mono">Dashboard Interface / Data Table goes here</p>
    </div>
  </div>
)

// --- MAIN APP ENTRY ---
function App() {
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

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Storefront products={products} loading={loading} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App