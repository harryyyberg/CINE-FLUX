import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Nav from "./components/Nav";
import Moviescomp from "./components/Moviescomp";
import Watchlistcomp from "./components/Watchlistcomp";
import Watchedcomp from "./components/Watchedcomp";
import Banner from "./components/Banner";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);  // ✅ keep movies here
  const [pageNo, setPageNo] = useState(1);
  const [Watchlist, setWatchList] = useState([]);
  const [Watched, setWatched] = useState([]);

  useEffect(() => {
    const w = localStorage.getItem("MoviesApp");
    if (w) setWatchList(JSON.parse(w));
    const watched = localStorage.getItem("WatchedMovies");
    if (watched) setWatched(JSON.parse(watched));
  }, []);

  // ✅ fetch movies here
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=38ac6294a61603a6bc667acbdc485034&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results || []);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, [pageNo]);

  const handleToggleWatchList = (movieObj) => {
    setWatchList((prev) => {
      const exists = prev.some((m) => m.id === movieObj.id);
      const newList = exists
        ? prev.filter((m) => m.id !== movieObj.id)
        : [...prev, movieObj];
      localStorage.setItem("MoviesApp", JSON.stringify(newList));
      return newList;
    });
  };

  const handleRemovefromWatchList = (movieObj, rating = 0) => {
    setWatchList((prev) => {
      const filtered = prev.filter((m) => m.id !== movieObj.id);
      localStorage.setItem("MoviesApp", JSON.stringify(filtered));
      return filtered;
    });

    if (rating > 0) {
      setWatched((prev) => {
        const newWatched = [...prev, { ...movieObj, rating }];
        localStorage.setItem("WatchedMovies", JSON.stringify(newWatched));
        return newWatched;
      });
    }
  };

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner
                movies={movies}
                Watchlist={Watchlist}
                handleToggleWatchList={handleToggleWatchList}
              />
              <Moviescomp
                movies={movies}
                pageNo={pageNo}
                setPageNo={setPageNo}
                Watchlist={Watchlist}
                handleToggleWatchList={handleToggleWatchList}
              />
            </>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              Watchlist={Watchlist}
              handleToggleWatchList={handleToggleWatchList}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlistcomp
              Watchlist={Watchlist}
              setWatchList={setWatchList}
              handleRemovefromWatchList={handleRemovefromWatchList}
            />
          }
        />
        <Route
          path="/watched"
          element={
            <Watchedcomp
              Watched={Watched}
              onRemove={(id) =>
                setWatched((prev) => prev.filter((m) => m.id !== id))
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
