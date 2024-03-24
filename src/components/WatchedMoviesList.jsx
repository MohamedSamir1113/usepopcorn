import WatchedMovie from "./WatchedMovie"

function WatchedMoviesList({watched,onDelete,handleMovieClick}) {
    return (
        <>
            <ul className="list">
                {watched.map((movie) => (<WatchedMovie handleMovieClick={handleMovieClick} onDelete={onDelete} movie={movie} key={movie.imdbID}/>))}
            </ul>
        </>
    )
}

export default WatchedMoviesList
