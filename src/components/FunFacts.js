import React, { useEffect, useState } from 'react';

export default function FunFacts() {
  const facts = [
    "The longest-running anime is Sazae-san, airing since 1969.",
    "One Piece is the best-selling manga series of all time.",
    "The word 'anime' is an abbreviation of 'animation' in Japanese.",
    "Naruto's favorite food is ramen!",
    "Spirited Away is the only non-English-language film to win the Oscar for Best Animated Feature.",
    "Attack on Titan was inspired by Muv-Luv Alternative, a visual novel.",
    "Astro Boy (Tetsuwan Atom) is considered the first popular anime TV series.",
    "The Pokémon anime has over 1,200 episodes.",
    "Dragon Ball Z's Goku was inspired by Sun Wukong from Journey to the West.",
    "Sailor Moon helped popularize the magical girl genre worldwide."
  ];
  const [fact, setFact] = useState('');

  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);
  }, []);

  const handleNewFact = () => {
    let newFact;
    do {
      newFact = facts[Math.floor(Math.random() * facts.length)];
    } while (newFact === fact && facts.length > 1);
    setFact(newFact);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-gray-200 flex flex-col items-start">
      <span className="mb-2">{fact}</span>
      <button
        onClick={handleNewFact}
        className="mt-2 px-3 py-1 bg-neon-blue text-white rounded hover:bg-blue-700 transition text-sm"
      >
        New Fact
      </button>
    </div>
  );
}
