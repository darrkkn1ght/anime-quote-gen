import React from 'react';
import QuoteCard from './components/QuoteCard';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <header className="w-full flex flex-col items-center mb-8">
        <img src="/favicon.ico" alt="Animechan Logo" className="w-16 h-16 mb-2" />
        <h1 className="text-3xl font-bold text-neon-purple drop-shadow-lg">Animechan</h1>
        <p className="text-gray-400 text-sm mt-1">Your Ultimate API for Anime Quotes & Information</p>
      </header>
      <QuoteCard />
    </div>
  );
}

export default App;