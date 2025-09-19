import React, { useEffect, useState } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('anime-favorites') || '[]');
    setFavorites(favs);
  }, []);

  const removeFavorite = (idx) => {
    const newFavs = favorites.filter((_, i) => i !== idx);
    setFavorites(newFavs);
    localStorage.setItem('anime-favorites', JSON.stringify(newFavs));
  };

  if (favorites.length === 0) {
    return <div className="bg-gray-800 rounded-lg p-4 text-gray-400">No favorites yet. Click the heart icon on a quote to save it!</div>;
  }

  return (
    <div className="space-y-4">
      {favorites.map((q, i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <div>
            <blockquote className="text-lg font-semibold mb-2">"{q.quote}"</blockquote>
            <p className="text-neon-purple font-medium">— {q.character}</p>
            <p className="text-gray-400 italic">{q.anime}</p>
          </div>
          <button
            onClick={() => removeFavorite(i)}
            className="ml-4 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
            aria-label="Remove from favorites"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
