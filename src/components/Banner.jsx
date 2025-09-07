import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Banner({ movies, Watchlist, handleToggleWatchList }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!movies || movies.length === 0) return;
    console.log(movies);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) {
    return (
      <div className="h-[50vh] flex items-center justify-center bg-gray-800 text-white text-xl">
        Loading movies...
      </div>
    );
  }

  const movie = movies[index];
  const isInWatchlist = Watchlist.some((m) => m.id === movie.id);

  return (
    <div className="relative mt-24 px-10"> {/* gap from top with margin + side padding */}
      {/* Banner */}
      <div
  className="h-[50vh] sm:h-[60vh] md:h-[70vh] 
             bg-cover bg-center flex flex-col justify-end relative 
             transition-all duration-700 rounded-xl overflow-hidden shadow-lg"
  style={{
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
  }}
>
  {/* Movie info */}
  <div className="relative z-10 p-4 sm:p-6 text-white">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
      {movie.title}
    </h1>
    <p className="max-w-md text-xs sm:text-sm md:text-base line-clamp-3 mb-4">
      {movie.overview}
    </p>

    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <button onClick={() => navigate(`/movie/${movie.id}`)} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 shadow-md text-sm sm:text-base">
        
        More Details
      </button>
      <button onClick={() => handleToggleWatchList(movie)} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 shadow-md text-sm sm:text-base">
        
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  </div>
</div>


      {/* Navigation buttons (outside banner) */}
      <button
        onClick={() =>
          setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1))
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-rose-600 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-rose-700 transition"
      >
        {"<"}
      </button>
      <button
        onClick={() => setIndex((prev) => (prev + 1) % movies.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-rose-600 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-rose-700 transition"
      >
        {">"}
      </button>
    </div>
  );
}

export default Banner;
