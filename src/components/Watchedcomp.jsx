import React, { useState } from "react";

function Watchedcomp({ Watched, onRemove }) {
  const [filter, setFilter] = useState(0);

  return (
    <div className="p-6 m-4 mt-20">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Watched Movies
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-2 mb-6">
        {[0, 1, 2, 3, 4, 5].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              filter === f
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {f === 0 ? "All" : `${f}★ & up`}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Watched.filter((m) => filter === 0 || m.rating >= filter).map(
          (movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-[300px] w-full object-contain"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {movie.title}
                  </h3>
                  <p className="text-yellow-500 text-lg mt-1">
                    {"★".repeat(movie.rating)}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(movie.id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg w-full transition"
                >
                  Remove
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Watchedcomp;
