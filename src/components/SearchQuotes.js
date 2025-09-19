import React, { useState } from 'react';

export default function SearchQuotes() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('anime');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);
    let url = '';
    if (type === 'anime') {
      url = `https://api.animechan.io/v1/quotes/anime?title=${encodeURIComponent(query)}`;
    } else {
      url = `https://api.animechan.io/v1/quotes/character?name=${encodeURIComponent(query)}`;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('No results found.');
      const data = await res.json();
      setResults(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
          placeholder={`Search by ${type} name...`}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          className="px-2 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="anime">Anime</option>
          <option value="character">Character</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-neon-blue text-white rounded shadow-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      {loading && <div className="text-gray-400">Searching...</div>}
      {error && <div className="text-red-400">{error}</div>}
      <div className="space-y-4">
        {results.map((q, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-4">
            <blockquote className="text-lg font-semibold mb-2">"{q.quote}"</blockquote>
            <p className="text-neon-purple font-medium">— {q.character}</p>
            <p className="text-gray-400 italic">{q.anime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
