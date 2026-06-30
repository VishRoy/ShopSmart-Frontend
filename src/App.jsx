import { useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

function App() {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    setAnswer('')
    setProducts([])

    try {
      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      setAnswer(data.answer)
      setProducts(data.retrieved_products)
    } catch (error) {
      console.error('Error:', error)
      setAnswer('Could not reach the server. Make sure the backend is running.')
    }

    setLoading(false)
  }

  const suggestions = [
    'Shoes for gym',
    'Comfortable shoes for walking',
    'Best budget running shoes',
  ]

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-mark">●</span>
          <span>ShopSmart</span>
        </div>
        <span className="badge">RAG Demo</span>
      </header>

      <main className="main">
        <div className="hero">
          <h1>Find the right shoe, in plain English</h1>
          <p className="hero-sub">
            Ask naturally — budget, use-case, comfort. Retrieval-augmented search does the rest.
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="e.g. comfortable shoes for office under ₹5000"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading || !query.trim()}>
            {loading ? <span className="spinner" /> : 'Search'}
          </button>
        </div>

        {!searched && (
          <div className="suggestions">
            {suggestions.map((s) => (
              <button key={s} className="chip" onClick={() => { setQuery(s); }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="skeleton-group">
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text short" />
            <div className="skeleton-cards">
              <div className="skeleton skeleton-card" />
              <div className="skeleton skeleton-card" />
              <div className="skeleton skeleton-card" />
            </div>
          </div>
        )}

        {!loading && answer && (
          <div className="answer-box">
            <div className="answer-label">
              <span className="dot" /> AI recommendation
            </div>
            <p>{answer}</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="products-grid">
            {products.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-top">
                  <span className="category-tag">{product.category}</span>
                </div>
                <h4>{product.name}</h4>
                <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        Built with FastAPI · ChromaDB · Groq — a RAG pipeline from scratch
      </footer>
    </div>
  )
}

export default App