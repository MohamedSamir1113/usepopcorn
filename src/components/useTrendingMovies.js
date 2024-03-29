import { useEffect,useState } from "react";
export function useTrendingMovies() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading1, setIsLoading] = useState(false);
    const [error1, setError] = useState("");
      
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
    
      return{trendingMovies,error1,isLoading1}
}