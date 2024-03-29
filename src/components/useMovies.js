import { useState,useEffect } from "react";
export function useMovies(query) {
    const KEY = "b09c1b1b"; 
  const [movies, setMovies] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(0);

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

  return {movies,isLoading,error,results}
}