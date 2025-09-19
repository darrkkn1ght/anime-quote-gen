import React from 'react';
import QuoteCard from './components/QuoteCard';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import SearchQuotes from './components/SearchQuotes';
import FunFacts from './components/FunFacts';
import Favorites from './components/Favorites';
import RecentQuotes from './components/RecentQuotes';
import AnimeRecommendations from './components/AnimeRecommendations';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="sticky top-0 z-10 w-full bg-gray-950 bg-opacity-90 shadow-md py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neon-purple tracking-wide">Anime Quote Generator</h1>
      </header>
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 space-y-12 overflow-y-auto">
        {/* Quote of the Day Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neon-blue mb-4">Quote of the Day</h2>
          <QuoteOfTheDay />
        </section>

        {/* Search Quotes Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neon-blue mb-4">Search Quotes</h2>
          <SearchQuotes />
        </section>

        {/* Favorites Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neon-blue mb-4">Favorites</h2>
          <Favorites />
        </section>

        {/* Recent Quotes Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neon-blue mb-4">Recent Quotes</h2>
          <RecentQuotes />
        </section>

        {/* Fun Facts Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neon-blue mb-4">Fun Facts</h2>
          <FunFacts />
        </section>

        {/* Anime Recommendations Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neon-blue mb-4">Anime Recommendations</h2>
          <AnimeRecommendations />
        </section>

        {/* Main Quote Card Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neon-blue mb-4">Random Anime Quote</h2>
          <QuoteCard />
        </section>
      </main>
    </div>
  );
}

export default App;