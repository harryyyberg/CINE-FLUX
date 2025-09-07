import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Moviescomp({ movies, pageNo, setPageNo, Watchlist, handleToggleWatchList }) {
  const navigate = useNavigate();

  const handlePrev = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  return (
    <>

      <div className="flex flex-wrap justify-center gap-6 px-6 mt-10">
        {Array.isArray(movies) &&
          movies.map((movie) => {
            const isInWatchlist = Watchlist.some((m) => m.id === movie.id);

            return (
              <div
                key={movie.id}
                className="relative w-[180px] md:w-[200px] bg-gray-900 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-[270px] object-cover"
                />
                <button
                  onClick={() => handleToggleWatchList(movie)}
                  className="absolute top-3 right-3 text-2xl z-20"
                >
                  {isInWatchlist ? "❤️" : "🤍"}
                </button>
                <div className="p-3 text-center">
                  <h3 className="text-white font-bold text-sm truncate">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-3">
                    {movie.overview || "No description available."}
                  </p>
                  <button
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="mt-3 bg-red-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-700 transition "
                  >
                    More Details
                  </button>
                </div>
              </div>
            );
          })}
      </div>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 my-8">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-rose-600 rounded-full hover:bg-rose-800 text-white"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="font-bold text-lg">{pageNo}</span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-rose-600 rounded-full hover:bg-rose-800 text-white "
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
}

export default Moviescomp;
