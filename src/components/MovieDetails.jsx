import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
const KEY = "b09c1b1b";
function MovieDetails({ selectedId, handleCloseMovie, onAdd, watched }) {
  const [selectedMovie, setSelectedMovie] = useState({});
 ;
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const currentRating=watched.find(movie=>movie.imdbID===selectedId)?.userRating

  const {
    Title: title,
    Poster: poster,
    Plot: plot,
    Year: year,
    Runtime: runtime,
    Actors: actors,
    Director: director,
    imdbRating,
    Released: released,
    Genre: genre,
  } = selectedMovie;

 
  useEffect(
    function () {
      async function showSelectedMovie() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          const data = await res.json();
          setSelectedMovie(data);
        } finally {
          setIsLoading(false);
        }
      }
      showSelectedMovie();
    },
    [selectedId]
  );
 

  useEffect(function () 
  {
   if(!title) return
    document.title=`Movie: ${title}`

    return function () {
      document.title="usePopcorn"
      console.log(`clan up of the movie: ${title}`);
    } //cleanup function to clean the effect after the component unmount
  },[title])

  function handleAdd() {
    const watchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAdd(watchedMovie);
  }

  return (
    <>
      {!isLoading && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${selectedMovie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} imdbRating
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
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed By: {director}</p>
          </section>
        </div>
      )}
      {isLoading && <Loader />}

     
    </>
  );
}

export default MovieDetails;
