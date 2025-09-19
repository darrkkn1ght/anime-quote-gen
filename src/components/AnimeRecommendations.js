import React, { useEffect, useState } from 'react';

const recommendations = [
  {
    anime: "Fullmetal Alchemist: Brotherhood",
    reason: "A masterpiece with deep themes and memorable quotes.",
    link: "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood"
  },
  {
    anime: "Attack on Titan",
    reason: "Epic storytelling and iconic lines from every character.",
    link: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin"
  },
  {
    anime: "One Piece",
    reason: "Adventure, friendship, and a quote for every occasion!",
    link: "https://myanimelist.net/anime/21/One_Piece"
  },
  {
    anime: "Naruto",
    reason: "Ninja wisdom and emotional moments abound.",
    link: "https://myanimelist.net/anime/20/Naruto"
  },
  {
    anime: "Death Note",
    reason: "Psychological battles and unforgettable dialogue.",
    link: "https://myanimelist.net/anime/1535/Death_Note"
  },
  {
    anime: "Steins;Gate",
    reason: "Time travel, science, and mind-bending quotes.",
    link: "https://myanimelist.net/anime/9253/Steins_Gate"
  },
  {
    anime: "Your Lie in April",
    reason: "Beautiful, emotional, and full of inspiring lines.",
    link: "https://myanimelist.net/anime/23273/Shigatsu_wa_Kimi_no_Uso"
  },
  {
    anime: "Cowboy Bebop",
    reason: "Classic cool and philosophical musings.",
    link: "https://myanimelist.net/anime/1/Cowboy_Bebop"
  },
  {
    anime: "My Hero Academia",
    reason: "Heroic spirit and motivational quotes.",
    link: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia"
  },
  {
    anime: "Demon Slayer",
    reason: "Stunning visuals and heartfelt words.",
    link: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba"
  }
];

export default function AnimeRecommendations() {
  const [rec, setRec] = useState(null);

  useEffect(() => {
    setRec(recommendations[Math.floor(Math.random() * recommendations.length)]);
  }, []);

  const handleNewRec = () => {
    let newRec;
    do {
      newRec = recommendations[Math.floor(Math.random() * recommendations.length)];
    } while (newRec === rec && recommendations.length > 1);
    setRec(newRec);
  };

  if (!rec) return <div className="text-gray-400">Loading...</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-gray-200 flex flex-col items-start">
      <span className="mb-2 font-bold text-neon-purple">{rec.anime}</span>
      <span className="mb-2 italic">{rec.reason}</span>
      <a
        href={rec.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 text-neon-blue underline hover:text-blue-400"
      >
        View on MyAnimeList
      </a>
      <button
        onClick={handleNewRec}
        className="mt-2 px-3 py-1 bg-neon-blue text-white rounded hover:bg-blue-700 transition text-sm"
      >
        New Recommendation
      </button>
    </div>
  );
}
