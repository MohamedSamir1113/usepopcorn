import Movie from "./Movie"
function MoviesList({movies,handleMovieClick}) {
    
    return (
        <>
            <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie handleMovieClick={handleMovieClick} movie={movie} key={movie.imdbID}/>
              ))}
            </ul>
        </>
    )
}

export default MoviesList
