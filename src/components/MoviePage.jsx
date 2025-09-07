import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function MovieDetails({ Watchlist, handleToggleWatchList }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // find movie details from Watchlist OR fetch it if needed
  const movie = Watchlist.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Movie not found!
      </div>
    );
  }

  const isInWatchlist = Watchlist.some((m) => m.id === movie.id);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
      }}
    >
      {/* dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-black bg-opacity-50 px-3 py-2 rounded-full hover:bg-opacity-80 transition"
      >
        ⬅ Back
      </button>

      {/* Movie card */}
      <div className="relative bg-white text-black rounded-2xl shadow-xl p-6 max-w-lg z-10">
        <h1 className="text-2xl font-bold mb-3">{movie.title}</h1>
        <p className="text-gray-700 mb-4">{movie.overview || "No description available."}</p>
        <p className="font-semibold mb-4">
          Age Requirement: <span className="font-normal">All Ages</span>
        </p>

        {/* Trailer button */}
        <a
          href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          🎬 Watch Trailer
        </a>

        {/* Heart button */}
        <button
          onClick={() => handleToggleWatchList(movie)}
          className="absolute top-6 right-6 text-3xl transition transform hover:scale-125"
        >
          {isInWatchlist ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
