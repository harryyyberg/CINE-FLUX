// App.js or Home.js
import React, { useState, useEffect } from "react";
import Moviescomp from "./Moviescomp";

const Home = () => {
  // Example movie data; you can replace with your API/fetch logic
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller by Christopher Nolan.",
      poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    },
    {
      id: 2,
      title: "Interstellar",
      description: "Exploring space and time across the universe.",
      poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    },
    // Add more movies here
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
      {/* Header */}
      <header className="container mx-auto p-6">
        <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">
          Welcome to MovieHub
        </h1>
        <p className="text-lg mb-6 drop-shadow-md">
          Discover top movies and manage your watchlist effortlessly!
        </p>
      </header>

      {/* Movie Grid */}
      <div className="container mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-sm mt-2">{movie.description}</p>
                <button className="mt-3 w-full bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                  Add to Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
