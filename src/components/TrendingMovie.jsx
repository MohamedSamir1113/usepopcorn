function TrendingMovie({ movie ,handleMovieClick}) {
  const Year = movie.release_date.split("-").at(0);
  const Poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <>
    
      <li onClick={()=>handleMovieClick(movie.id,true)}>
        <img src={Poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}

export default TrendingMovie;
