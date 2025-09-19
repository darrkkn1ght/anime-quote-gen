import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function QuoteCard() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackQuote = {
    quote: "Even if we forget the faces of our friends, we will never forget the bonds that were carved into our souls.",
    character: "Otonashi Yuzuru",
    anime: "Angel Beats!"
  };

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://animechan.xyz/api/random');
      if (!response.ok) throw new Error('Failed to fetch quote');
      const data = await response.json();
      setQuote(data);
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
            <div className="flex gap-4 mt-6">
              <button
                onClick={fetchQuote}
                className="px-4 py-2 bg-neon-purple text-white rounded shadow-md hover:bg-purple-700 hover:shadow-lg hover:scale-105 transition transform focus:outline-none focus:ring-2 focus:ring-neon-purple"
                aria-label="Fetch new quote"
              >
                New Quote
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default QuoteCard;