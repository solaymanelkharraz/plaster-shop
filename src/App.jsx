import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Admin from './pages/Admin'
import Store from './pages/Store' // We will uncomment this when you move the store code

export default function App() {
  return (
    <Router>
      <nav className="bg-[#FDFBF7] p-4 border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex gap-6">
          <Link to="/" className="text-stone-900 font-medium">Store</Link>
          <Link to="/admin" className="text-stone-500 hover:text-stone-900 transition-colors">Admin Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Store />} />
      </Routes>
    </Router>
  )
}