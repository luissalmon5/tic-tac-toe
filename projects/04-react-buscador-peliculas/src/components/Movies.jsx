export const ListOfMovies = ({ movies }) => {
    return (
        movies !== undefined && movies.length > 0
            ?
            <div className="movies-container">
                {

                    movies.map(movie =>
                        <div className='movie' key={movie.imdbID}>
                            <h3>{movie.Title ? movie.Title : 'No title'}</h3>
                            <p>Year: {movie.Year}</p>
                            <div className="image-wrapper">
                                <img src={movie.Poster ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title} />
                            </div>
                        </div>
                    )
                }
            </div>
            : <p className='no-movies'>No movies found</p>
    )
}