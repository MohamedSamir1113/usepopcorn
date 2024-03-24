import TrendingMovie from "./TrendingMovie"

function TrendingMoviesList({trendingMovies,handleMovieClick}) {
    return (
        <>
        <h3 className="text-center mt-4 pb-3">Top Trending Movies</h3>
        <ul className="list list-movies">
            {trendingMovies.map((movie)=><TrendingMovie handleMovieClick={handleMovieClick} movie={movie} key={movie.id}/>)}
        </ul>
        </>
    )
}

export default TrendingMoviesList
