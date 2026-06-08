import { useState } from 'react'
import { supabase } from '../supabase'

export default function Admin() {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({ name: '', description: '', price: '' })
  const [file, setFile] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !product.name || !product.price) {
      alert("Please fill all required fields and select an image.")
      return
    }

    setLoading(true)

    try {
      // 1. Upload the Image to Supabase Storage (Keep plaster-images bucket name!)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('plaster-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Get the public URL for the image
      const { data: { publicUrl } } = supabase.storage
        .from('plaster-images')
        .getPublicUrl(filePath)

      // 3. Save the product data to the Database (Keep products table name!)
      const { error: dbError } = await supabase
        .from('products')
        .insert([{ 
          name: product.name, 
          description: product.description, 
          price: parseFloat(product.price), 
          image_url: publicUrl 
        }])

      if (dbError) throw dbError

      alert('Candle product added successfully!')
      setProduct({ name: '', description: '', price: '' }) // Clear form
      setFile(null)
      
    } catch (error) {
      alert('Error saving product: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-beige text-stone-800 p-6 md:p-16">
      <div className="max-w-xl mx-auto bg-cream p-8 md:p-10 rounded-2xl shadow-sm border border-stone-200/60">
        <h1 className="text-3xl font-light font-serif text-stone-900 mb-2">Inventory Management</h1>
        <p className="text-xs text-stone-500 font-light mb-8">Upload new relaxing candles directly to your shop inventory database.</p>

        <form onSubmit={handleUpload} className="space-y-6 text-xs md:text-sm font-light">
          
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-light text-stone-600 tracking-wider uppercase mb-2">Product Image</label>
            <div className="border border-dashed border-stone-300 rounded-xl p-4 bg-white/50 hover:bg-white/80 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-xs text-stone-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] file:font-light file:bg-stone-200 file:text-stone-700 hover:file:bg-stone-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-xs font-light text-stone-600 tracking-wider uppercase mb-2">Candle Name</label>
            <input 
              type="text" 
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              className="w-full rounded-xl border border-stone-200 bg-white/50 p-3.5 text-stone-900 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none transition-all"
              placeholder="e.g. Lavender & Chamomile"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-light text-stone-600 tracking-wider uppercase mb-2">Price (MAD)</label>
            <input 
              type="number" 
              step="0.01"
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              className="w-full rounded-xl border border-stone-200 bg-white/50 p-3.5 text-stone-900 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none transition-all"
              placeholder="e.g. 150"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-light text-stone-600 tracking-wider uppercase mb-2">Description</label>
            <textarea 
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              className="w-full rounded-xl border border-stone-200 bg-white/50 p-3.5 text-stone-900 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none transition-all"
              rows="4"
              placeholder="Describe the scent notes, wax type (e.g. natural soy), and approximate burn time..."
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-xl bg-stone-900 py-4 text-xs font-light tracking-widest uppercase text-white hover:bg-stone-800 transition-colors duration-300 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {loading ? 'Uploading to Database...' : 'Save Product to Store'}
          </button>
        </form>
      </div>
    </div>
  )
}