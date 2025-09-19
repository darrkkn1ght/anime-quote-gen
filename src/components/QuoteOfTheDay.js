import React, { useEffect, useState } from 'react';

const fallbackQuote = {
  quote: "No matter how deep the night, it always turns to day, eventually.",
  character: "Brook",
  anime: "One Piece"
};

function getTodayKey() {
  const today = new Date();
  return today.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const todayKey = getTodayKey();
    const cached = localStorage.getItem('qotd-' + todayKey);
    if (cached) {
      setQuote(JSON.parse(cached));
      setLoading(false);
      return;
    }
    fetch('https://api.animechan.io/v1/quotes/random')
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => {
        const data = result.data;
        const q = {
          quote: data.content,
          character: data.character.name,
          anime: data.anime.name
        };
        setQuote(q);
        localStorage.setItem('qotd-' + todayKey, JSON.stringify(q));
      })
      .catch(() => {
        setQuote(fallbackQuote);
        setError('Failed to fetch quote. Showing fallback.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-400">Loading...</div>;
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-gray-200">
      <blockquote className="text-lg font-semibold mb-2">"{quote.quote}"</blockquote>
      <p className="text-neon-purple font-medium">— {quote.character}</p>
      <p className="text-gray-400 italic">{quote.anime}</p>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
