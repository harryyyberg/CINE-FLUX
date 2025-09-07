import React, { useEffect } from "react";

function MovieModal({ movie, trailerUrl, onClose, handleToggleWatchList, Watchlist }) {
  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!movie) return null;

  const isInWatchlist = Watchlist.some((m) => m.id === movie.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Back Arrow */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-700 hover:text-black text-2xl"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        {/* Movie title */}
        <h2 className="text-xl font-bold mb-3">{movie.title}</h2>

        {/* Overview */}
        <p className="text-gray-700 mb-4">{movie.overview}</p>

        {/* Age restriction */}
        <p className="font-semibold mb-4">
          Age Requirement:{" "}
          <span className="font-normal">{movie.adult ? "18+" : "All Ages"}</span>
        </p>

        {/* Trailer */}
        {trailerUrl ? (
          <a
            href={trailerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            🎬 Watch Trailer
          </a>
        ) : (
          <p className="text-gray-500">No trailer available</p>
        )}

        {/* Heart button */}
        <button
          onClick={() => handleToggleWatchList(movie)}
          className="absolute top-4 right-4 text-2xl"
        >
          {isInWatchlist ? (
            <i className="fa-solid fa-heart text-red-500"></i>
          ) : (
            <i className="fa-regular fa-heart text-gray-400 hover:text-red-500"></i>
          )}
        </button>
      </div>
    </div>
  );
}

export default MovieModal;
