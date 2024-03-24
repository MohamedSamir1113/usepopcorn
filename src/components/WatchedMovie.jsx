function WatchedMovie({movie,onDelete,handleMovieClick}) {
  const handleClick = (e) => {
    // Check if the clicked element is not the delete button
    if (!e.target.classList.contains('btn-delete')) {
      if(String(movie.imdbID).includes("tt"))
      {
        handleMovieClick(movie.imdbID)
      }
      else{
        handleMovieClick(movie.imdbID,true)
      }
      
    }
  };
    return (
        <>
           <li style={{cursor:"pointer"}} onClick={handleClick}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
 
                      <p><button onClick={()=>onDelete(movie.imdbID)} className="btn-delete" >❌</button></p>
                    </div>
           </li> 
        </>
    )
}

export default WatchedMovie
