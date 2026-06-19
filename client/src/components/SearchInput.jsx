import { useEffect, useState } from 'react'
import api from '../api.js'

export default function SearchInput({ onSelect }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)



    useEffect(() => {
        if (query.length === 0) {
            setResults([])
            return
        }
    
    const search = async () => {
      const response = await api.get(`/api/cast/search?q=${encodeURIComponent(query)}`)
      setResults(response.data)
      setShowDropdown(true)
    }
    search()
  }, [query])

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setHighlightedIndex(prev => Math.min(prev + 1, results.length - 1))
        }
        if (e.key === 'ArrowUp') {
            setHighlightedIndex(prev => Math.max(prev - 1, 0))
        }
        if (e.key === 'Enter' && highlightedIndex >= 0) {
            onSelect(results[highlightedIndex])
            setQuery('')
            setShowDropdown(false)
            setHighlightedIndex(-1)
        }
        if (e.key === 'Escape') {
            setResults([])
            setShowDropdown(false)
            setHighlightedIndex(-1)
        }
        }

    return (
        <div className="search-wrapper">
            <input 
            type='text' 
            placeholder='Search cast members...' 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
            />

            {showDropdown && results.length > 0 && (
            <ul className="search-dropdown">
                {results.map((actor, index) => (
                <li
                    key={actor.id}
                    className={`search-dropdown-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                    onClick={() => {
                    onSelect(actor)
                    setQuery('')
                    setShowDropdown(false)
                    }}
                >
                    {actor.name} — S{actor.season.number} {actor.season.country.toUpperCase()}
                </li>
                ))}
            </ul>
            )}
        </div>
    )
}