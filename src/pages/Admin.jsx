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
      // 1. Upload the Image to Supabase Storage
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

      // 3. Save the product data to the Database
      const { error: dbError } = await supabase
        .from('products')
        .insert([{ 
          name: product.name, 
          description: product.description, 
          price: parseFloat(product.price), 
          image_url: publicUrl 
        }])

      if (dbError) throw dbError

      alert('Product added successfully!')
      setProduct({ name: '', description: '', price: '' }) // Clear form
      setFile(null)
      
    } catch (error) {
      alert('Error saving product: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 p-8 md:p-16">
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200">
        <h1 className="text-3xl font-light text-stone-900 mb-2">Inventory Management</h1>
        <p className="text-stone-500 mb-8">Upload new plaster decor directly to your database.</p>

        <form onSubmit={handleUpload} className="space-y-6">
          
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Product Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
            <input 
              type="text" 
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              className="w-full rounded-xl border-stone-300 bg-stone-50 p-3 text-stone-900 focus:ring-2 focus:ring-stone-400 outline-none transition-all"
              placeholder="e.g. Ribbed Candle Tray"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Price ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              className="w-full rounded-xl border-stone-300 bg-stone-50 p-3 text-stone-900 focus:ring-2 focus:ring-stone-400 outline-none transition-all"
              placeholder="24.99"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
            <textarea 
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              className="w-full rounded-xl border-stone-300 bg-stone-50 p-3 text-stone-900 focus:ring-2 focus:ring-stone-400 outline-none transition-all"
              rows="3"
              placeholder="Hand-poured white jesmonite..."
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-xl bg-stone-900 py-4 text-sm font-semibold text-white hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Uploading to Database...' : 'Save Product to Store'}
          </button>
        </form>
      </div>
    </div>
  )
}