import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

function TrendingDetails({ selectedTrendingId, handleCloseTrendingMovie ,watched,onAdd}) {
  const [selectedTrendingMovie, setSelectedTrendingMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedTrendingId);
  const currentRating=watched.find(movie=>movie.imdbID===selectedTrendingId)?.userRating
  const {
    original_title,
    overview,
    poster_path,
    release_date,
    runtime,
    vote_average,
    genres,
  } = selectedTrendingMovie;
  
  useEffect(() => {
    const fetchTrendingMovie = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTcwMDNkNjNmMWY0MzMxMWRhZDgwNzE5ZWNhNDdkOSIsInN1YiI6IjY1ZmY0M2EzNzcwNzAwMDE2MzA5YzAxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lz1gxv_JjeLzlNKsepG6Xnb0VxkE90vjhgRqrz36_yM",
          },
        };

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedTrendingId}?language=en-US`,
          options
        );
        const data = await res.json();
        setSelectedTrendingMovie(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching trending movie:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovie();
  }, [selectedTrendingId]);

  useEffect(function () 
  {
   if(!original_title) return
    document.title=`Movie: ${original_title}`

    return function () {
      document.title="usePopcorn"
      console.log(`clan up of the movie: ${original_title}`);
    } //cleanup function to clean the effect after the component unmount
  },[original_title])

  function handleAdd() {
    const watchedMovie = {
      imdbID: selectedTrendingId,
      title:original_title,
      year:release_date.split("-").at(0),
      poster:`https://image.tmdb.org/t/p/w500/${poster_path}`,
      imdbRating: Number(vote_average.toFixed(1)),
      runtime,
      userRating,
    };
    onAdd(watchedMovie);
  }
  return (
    <>
      {!isLoading && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={handleCloseTrendingMovie}>
              &larr;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={`poster of ${original_title} movie`}
            />
            <div className="details-overview">
              <h2>{original_title}</h2>
              <p>
                {release_date} &bull; {runtime} min
              </p>
              <p>{genres && genres.length > 0 && genres[0].name}</p>
              <p>
                <span>⭐</span>
                {vote_average && vote_average.toFixed(1)} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    rating={userRating}
                    onSetRating={setUserRating}
                    size={24}
                    maxRating={10}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to Watched List
                    </button>
                  )}
                </>
              ) : (
                <p>{`You rated this Movie with ${currentRating}⭐`}</p>
              )}
            </div>
            <p>
              <em>{overview}</em>
            </p>
            
          </section>
          
        </div>
      )}

      {isLoading && <Loader />}
    </>
  );
}

export default TrendingDetails;
