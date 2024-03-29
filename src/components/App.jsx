import NavBar from "./NavBar";
import Main from "./Main";
import NumResults from "./NumResults";
import Box from "./Box";
import Search from "./Search";
import MoviesList from "./MoviesList";
import { useState } from "react";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import TrendingMoviesList from "./TrendingMoviesList";
import TrendingDetails from "./TrendingDetails";
import { useMovies } from "./useMovies";
import { useTrendingMovies } from "./useTrendingMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTrendingId, setSelectedTrendingId] = useState(null);

  function handleMovieClick(id, isTrending) {
    if (isTrending) {
      setSelectedTrendingId((selectedTrendingId) =>
        selectedTrendingId === id ? null : id
      );
      setSelectedId(null);
    } else {
      setSelectedId((selectedId) => (selectedId === id ? null : id));
      setSelectedTrendingId(null);
    }
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleCloseTrendingMovie() {
    setSelectedTrendingId(null);
  }

  function handleAddingMovieToWatchList(movie) {
    setWatched((watched) => [...watched, movie]);
    //localStorage.setItem('watched',JSON.stringify([...watched,movie]))
    setSelectedId(null);
    setSelectedTrendingId(null);
  }

  function handleDeleteMovieFromWatchList(id) {
    setWatched((watched) =>
      watched.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }

  const { isLoading1, trendingMovies, error1 } = useTrendingMovies(); //customHook1
  const { movies, results, isLoading, error } = useMovies(query); //customHook2
  const[watched,setWatched]= useLocalStorageState([],"watched") //customHook3
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
              {!isLoading1 && !error && (
                <TrendingMoviesList
                  handleMovieClick={handleMovieClick}
                  trendingMovies={trendingMovies}
                />
              )}
              {isLoading1 && <Loader />}
              {error1 && <ErrorMessage message={error} />}
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
