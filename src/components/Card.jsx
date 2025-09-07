import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({
  poster_path,
  name,
  handleAddtoWatchList,
  handleRemovefromWatchList,
  movieObj,
  Watchlist,
}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  function doesContain(movieObj) {
    return Watchlist.some((m) => m.id === movieObj.id);
  }

  const handleAddClick = (e) => {
    e.stopPropagation();
    handleAddtoWatchList(movieObj);
    setMessage("✅ Added to watchlist");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    handleRemovefromWatchList(movieObj);
    setMessage("❌ Removed from watchlist");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div
      className="h-[35vh] sm:h-[40vh] w-[140px] sm:w-[160px] md:w-[180px] bg-center bg-cover m-3 rounded-xl hover:scale-105 duration-300 relative cursor-pointer overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
      }}
    >
      {/* Watchlist buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        {doesContain(movieObj) ? (
          <button
            onClick={handleRemoveClick}
            className="bg-red-600 text-white text-[9px] sm:text-[10px] md:text-xs px-2 py-1 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            REMOVE
          </button>
        ) : (
          <button
            onClick={handleAddClick}
            className="bg-green-600 text-white text-[9px] sm:text-[10px] md:text-xs px-2 py-1 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            ADD
          </button>
        )}
      </div>

      {/* Temporary confirmation message */}
      {message && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs sm:text-sm px-2 py-1 rounded">
          {message}
        </div>
      )}

      {/* Clickable overlay for movie details */}
      <div
        onClick={() => navigate(`/movie/${movieObj.id}`)}
        className="absolute bottom-0 w-full text-white p-2 text-center font-bold text-sm sm:text-base bg-gray-900/60 rounded-b-xl"
      >
        {name}
      </div>
    </div>
  );
}

export default Card;
