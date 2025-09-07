import React, { useEffect, useState } from "react";
import genres from "../Utilities/genre";

function Watchlistcomp({ Watchlist, setWatchList, handleRemovefromWatchList }) {
  const [search, setSearch] = useState("");
  const [genrelist, setGenrelist] = useState([]);
  const [currentgenre, setCurrentgenre] = useState("All Genres");
  const [ratingPrompt, setRatingPrompt] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const allGenres = new Set();
    (Watchlist || []).forEach((m) => {
      if (m.genre_ids && m.genre_ids.length) {
        m.genre_ids.forEach((gid) => {
          if (genres[gid]) allGenres.add(genres[gid]);
        });
      } else {
        allGenres.add("Unknown");
      }
    });
    setGenrelist(Array.from(allGenres));
  }, [Watchlist]);

  const handleSearch = (e) => setSearch(e.target.value);

  const sortIncreasing = () => {
    const sorted = [...(Watchlist || [])].sort((a, b) => a.vote_average - b.vote_average);
    setWatchList(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...(Watchlist || [])].sort((a, b) => b.vote_average - a.vote_average);
    setWatchList(sorted);
  };

  const sortPOPIncreasing = () => {
    const sorted = [...(Watchlist || [])].sort((a, b) => a.popularity - b.popularity);
    setWatchList(sorted);
  };

  const sortPOPDecreasing = () => {
    const sorted = [...(Watchlist || [])].sort((a, b) => b.popularity - a.popularity);
    setWatchList(sorted);
  };

  const confirmDelete = (movie) => {
    setRatingPrompt(movie);
    setRating(0);
  };

  const submitRating = () => {
    handleRemovefromWatchList(ratingPrompt, rating);
    setRatingPrompt(null);
  };

  return (
    <>
      {/* Genre Filter */}
      <div className="flex justify-center flex-wrap m-4">
        {/* All Genres Button */}
        <div
          onClick={() => setCurrentgenre("All Genres")}
          className={
            currentgenre === "All Genres"
              ? "flex justify-center h-[3rem] w-[10rem] rounded-xl bg-green-500 text-white font-bold items-center m-2 cursor-pointer mt-20"
              : "cursor-pointer flex justify-center h-[3rem] w-[10rem] rounded-xl bg-blue-500 text-white font-bold items-center mt-20"
          }
        >
          All Genres
        </div>

        {/* Other Genres */}
        <div className="flex justify-center flex-wrap m-4 mt-2">
  {genrelist.map((genre) => (
    <div
      key={genre}
      onClick={() => setCurrentgenre(genre)}
      className={
        currentgenre === genre
          ? "flex justify-center h-[3rem] w-[9rem] rounded-xl bg-gray-600 text-white font-bold items-center m-2 cursor-pointer shadow-md"
          : "cursor-pointer flex justify-center h-[3rem] w-[9rem] rounded-xl bg-blue-400 text-white font-bold items-center m-2 hover:bg-blue-500"
      }
    >
      {genre}
    </div>
  ))}
</div>

      </div>

      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search for Movies"
          className="bg-gray-200 h-[3rem] w-[400px] my-8 px-4 outline-none rounded-lg"
        />
      </div>

      {/* Movies Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th className="px-6 py-2">Name</th>
              {/* Rating Column */}
              <th className="text-center px-6 py-2">
                <div className="flex flex-col justify-between">
                  <div className="flex space-x-1 mb-1 items-center justify-center">
                    <i onClick={sortDecreasing} className="fa-solid fa-arrow-up cursor-pointer" />
                    <div>Ratings</div>
                    <i onClick={sortIncreasing} className="fa-solid fa-arrow-down cursor-pointer" />
                  </div>
                </div>
              </th>
              {/* Popularity Column */}
              <th className="text-center px-6 py-2">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-1 mb-1 items-center justify-center">
                    <i onClick={sortPOPDecreasing} className="fa-solid fa-arrow-up cursor-pointer" />
                    <div>Popularity</div>
                    <i onClick={sortPOPIncreasing} className="fa-solid fa-arrow-down cursor-pointer" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-2">Genre</th>
              <th className="px-6 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {(Watchlist || [])
              .filter((movieobj) => {
                if (currentgenre === "All Genres") return true;
                const g = movieobj.genre_ids && movieobj.genre_ids.length
                  ? movieobj.genre_ids.map((id) => genres[id] || "Unknown")
                  : ["Unknown"];
                return g.includes(currentgenre);
              })
              .filter((movieobj) =>
                (movieobj.title || movieobj.original_title || "")
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((movieobj) => (
                <tr key={movieobj.id} className="border-b-2">
                  <td className="flex items-center px-6 py-4">
                    <img
                      className="h-[12rem] w-[8rem] object-cover rounded-lg shadow-md"
                      src={`https://image.tmdb.org/t/p/w500${movieobj.poster_path}`}
                      alt={movieobj.title}
                    />
                    <div className="m-10">{movieobj.title || movieobj.original_title}</div>
                  </td>
                  <td>{movieobj.vote_average}</td>
                  <td>{movieobj.popularity}</td>
                  <td>
                    {movieobj.genre_ids && movieobj.genre_ids.length
                      ? movieobj.genre_ids.map((id) => genres[id] || "Unknown").join(", ")
                      : "Unknown"}
                  </td>
                  <td
                    onClick={() => confirmDelete(movieobj)}
                    className="text-red-800 cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Rating Modal */}
      {ratingPrompt && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl">
            <h3 className="text-lg mb-2">Did you like {ratingPrompt.title}? Rate it:</h3>
            <div className="flex space-x-2 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={star <= rating ? "text-yellow-500 cursor-pointer" : "cursor-pointer"}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={submitRating}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit
              </button>
              <button
                onClick={() => setRatingPrompt(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleRemovefromWatchList(ratingPrompt);
                  setRatingPrompt(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete Without Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Watchlistcomp;
