import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function QuoteCard() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const fallbackQuote = {
    quote: "Even if we forget the faces of our friends, we will never forget the bonds that were carved into our souls.",
    character: "Otonashi Yuzuru",
    anime: "Angel Beats!"
  };

  // Check if current quote is in favorites
  useEffect(() => {
    if (!quote) return;
    const favs = JSON.parse(localStorage.getItem('anime-favorites') || '[]');
    setIsFavorite(favs.some(q => q.quote === quote.quote && q.character === quote.character && q.anime === quote.anime));
  }, [quote]);

  const addToFavorites = () => {
    if (!quote) return;
    const favs = JSON.parse(localStorage.getItem('anime-favorites') || '[]');
    if (!favs.some(q => q.quote === quote.quote && q.character === quote.character && q.anime === quote.anime)) {
      favs.push(quote);
      localStorage.setItem('anime-favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };


  const fetchQuote = async () => {
    if (cooldown) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.animechan.io/v1/quotes/random');
      if (response.status === 429) {
        setError('You are requesting quotes too quickly. Please wait a few seconds.');
        setQuote(fallbackQuote);
        setCooldown(true);
        setTimeout(() => setCooldown(false), 5000);
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch quote');
      const result = await response.json();
      const data = result.data;
      const newQuote = {
        quote: data.content,
        character: data.character.name,
        anime: data.anime.name
      };
      setQuote(newQuote);
      // Add to recent quotes
      let recent = JSON.parse(localStorage.getItem('anime-recent') || '[]');
      // Avoid duplicates and keep max 20
      recent = recent.filter(q => !(q.quote === newQuote.quote && q.character === newQuote.character && q.anime === newQuote.anime));
      recent.unshift(newQuote);
      if (recent.length > 20) recent = recent.slice(0, 20);
      localStorage.setItem('anime-recent', JSON.stringify(recent));
      setCooldown(true);
      setTimeout(() => setCooldown(false), 3000);
    } catch (err) {
      setError(err.message);
      setQuote(fallbackQuote);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyToClipboard = () => {
    const text = `"${quote.quote}" — ${quote.character} (${quote.anime})`;
    navigator.clipboard.writeText(text);
    alert('Quote copied to clipboard!');
  };

  const shareToX = () => {
    const text = `"${quote.quote}" — ${quote.character} (${quote.anime})`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-label="Anime Quote Card"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="flex justify-center items-center h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-purple"></div>
          </motion.div>
        ) : (
          <motion.div
            key={quote.quote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <blockquote className="text-lg font-semibold mb-4">
              "{quote.quote}"
            </blockquote>
            <p className="text-neon-purple font-medium">
              — {quote.character}
            </p>
            <p className="text-gray-400 italic">
              {quote.anime}
            </p>
            {error && (
              <p className="text-red-400 text-sm mt-2">
                Error: {error}. Showing fallback quote.
              </p>
            )}
            <div className="flex gap-4 mt-6 flex-wrap">
              <button
                onClick={fetchQuote}
                className={`px-4 py-2 bg-neon-purple text-white rounded shadow-md hover:bg-purple-700 hover:shadow-lg hover:scale-105 transition transform focus:outline-none focus:ring-2 focus:ring-neon-purple ${cooldown ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Fetch new quote"
                disabled={cooldown}
              >
                {cooldown ? 'Please wait...' : 'New Quote'}
              </button>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-neon-blue text-white rounded shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition transform focus:outline-none focus:ring-2 focus:ring-neon-blue"
                aria-label="Copy quote to clipboard"
              >
                Copy
              </button>
              <button
                onClick={shareToX}
                className="px-4 py-2 bg-gray-700 text-white rounded shadow-md hover:bg-gray-600 hover:shadow-lg hover:scale-105 transition transform focus:outline-none focus:ring-2 focus:ring-gray-500"
                aria-label="Share quote to X"
              >
                Share to X
              </button>
              <button
                onClick={addToFavorites}
                className={`px-4 py-2 bg-pink-600 text-white rounded shadow-md hover:bg-pink-700 hover:shadow-lg hover:scale-105 transition transform focus:outline-none focus:ring-2 focus:ring-pink-400 ${isFavorite ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Add to favorites"
                disabled={isFavorite}
              >
                {isFavorite ? 'Favorited' : '❤ Favorite'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default QuoteCard;