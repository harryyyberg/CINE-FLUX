import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MovieDetails({ Watchlist, handleToggleWatchList }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const localMovie = Watchlist.find((m) => m.id === parseInt(id));
    if (localMovie) {
      setMovie(localMovie);
    } else {
      // Fetch from TMDB API
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=38ac6294a61603a6bc667acbdc485034&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch(() => setMovie(null));
    }
  }, [id, Watchlist]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Loading movie details...
      </div>
    );
  }

  const isInWatchlist = Watchlist.some((m) => m.id === movie.id);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          movie.backdrop_path || movie.poster_path || ""
        })`,
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 text-white bg-black/50 px-3 py-2 rounded-full hover:bg-black/70 transition"
      >
      <i class="fa-solid fa-arrow-left"></i> 
      </button>

      {/* Movie card */}
      <div className="relative bg-white/90 text-black rounded-2xl shadow-xl p-6 max-w-lg z-10">
        <h1 className="text-2xl font-bold mb-3">{movie.title}</h1>
        <p className="text-gray-700 mb-4">
          {movie.overview || "No description available."}
        </p>

        {/* Sensor Rating */}
        <p className="font-semibold mb-4">
          Sensor Rating:{" "}
          <span className="font-normal">
            {movie.adult ? "A (Adults Only)" : "U/A (Universal with Parental Guidance)"}
          </span>
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
