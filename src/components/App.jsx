import NavBar from "./NavBar";
import Main from "./Main";
import NumResults from "./NumResults";
import Box from "./Box";
import Search from "./Search";
import MoviesList from "./MoviesList";
import { useEffect, useState } from "react";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import TrendingMoviesList from "./TrendingMoviesList";
import TrendingDetails from "./TrendingDetails";

export default function App() {
  const KEY = "b09c1b1b";
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTrendingId, setSelectedTrendingId] = useState(null);

  useEffect(function () {
    async function TrendingMovies() {
      try {
        setIsLoading(true);
        setError("");
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTcwMDNkNjNmMWY0MzMxMWRhZDgwNzE5ZWNhNDdkOSIsInN1YiI6IjY1ZmY0M2EzNzcwNzAwMDE2MzA5YzAxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lz1gxv_JjeLzlNKsepG6Xnb0VxkE90vjhgRqrz36_yM",
          },
        };
        const res = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          options
        );
        if (!res.ok) {
          throw new Error("something went wrong!!"); //first error message
        }
        const data = await res.json();
        console.log(data.results);
        setTrendingMovies(data.results);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }
    TrendingMovies();
  }, []);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("something went wrong!!"); //first error message
          }
          const data = await res.json();
          if (data.Response === "False") {
            setResults(0);
            throw new Error("no Movie with this Name"); //second error message
          }
          setMovies(data.Search);
          setError("");
          setResults(data.Search.length);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          //code to be executed no matter what
          setIsLoading(false);
        }
      }
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function handleMovieClick(id, isTrending) {
    if (isTrending) {
      setSelectedTrendingId((selectedTrendingId) =>
        selectedTrendingId === id ? null : id
      );
      setSelectedId(null)
    } else {
      setSelectedId((selectedId) => (selectedId === id ? null : id));
      setSelectedTrendingId(null)
    }
    console.log(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
   
  }
  function handleCloseTrendingMovie() {
    
    setSelectedTrendingId(null);
  }

  function handleAddingMovieToWatchList(movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedId(null);
    setSelectedTrendingId(null);
  }

  function handleDeleteMovieFromWatchList(id) {
    setWatched((watched) =>
      watched.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults results={results} />
      </NavBar>
      <Main>
        <Box>
          {query ? (
            <>
              {!isLoading && !error && (
                <MoviesList
                  handleMovieClick={handleMovieClick}
                  movies={movies}
                />
              )}
              {isLoading && <Loader />}
              {error && <ErrorMessage message={error} />}
            </>
          ) : (
            <>
              {!isLoading && !error && (
                <TrendingMoviesList
                  handleMovieClick={handleMovieClick}
                  trendingMovies={trendingMovies}
                />
              )}
              {isLoading && <Loader />}
              {error && <ErrorMessage message={error} />}
            </>
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              handleCloseMovie={handleCloseMovie}
              onAdd={handleAddingMovieToWatchList}
              selectedId={selectedId}
              watched={watched}
            />
          ) : selectedTrendingId ? (
            <>
              <TrendingDetails
                handleCloseTrendingMovie={handleCloseTrendingMovie}
                selectedTrendingId={selectedTrendingId}
                onAdd={handleAddingMovieToWatchList}
                watched={watched}
              />
            </>
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                onDelete={handleDeleteMovieFromWatchList}
                watched={watched}
                handleMovieClick={handleMovieClick}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
