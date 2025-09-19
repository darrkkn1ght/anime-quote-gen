import React from 'react';
import QuoteCard from './components/QuoteCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="sticky top-0 z-10 w-full bg-gray-950 bg-opacity-90 shadow-md py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neon-purple tracking-wide">Anime Quote Generator</h1>
        {/* Add nav or actions here if needed */}
      </header>
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 overflow-y-auto">
        <QuoteCard />
        {/* Add more sections/components here for a scrollable experience */}
      </main>
    </div>
  );
}

export default App;