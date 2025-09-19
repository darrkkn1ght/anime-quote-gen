import React, { useEffect, useState } from 'react';

export default function RecentQuotes() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const rec = JSON.parse(localStorage.getItem('anime-recent') || '[]');
    setRecent(rec);
  }, []);

  const clearRecent = () => {
    localStorage.removeItem('anime-recent');
    setRecent([]);
  };

  if (recent.length === 0) {
    return <div className="bg-gray-800 rounded-lg p-4 text-gray-400">No recent quotes yet. View or search for quotes to see them here!</div>;
  }

  return (
    <div>
      <button
        onClick={clearRecent}
        className="mb-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
      >
        Clear All
      </button>
      <div className="space-y-4">
        {recent.map((q, i) => (
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
