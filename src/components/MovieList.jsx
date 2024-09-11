import React from "react";

const MovieList = ({ movies }) => {
  const fallbackImage =
    "https://via.placeholder.com/150?text=No+Image+Available";

  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map(movie => (
          <div className="movie-item" key={movie.imdbID}>
            <img
              alt={movie.Title}
              className="movie-poster"
              src={movie.Poster !== "N/A" ? movie.Poster : fallbackImage}
            />
            <h5 className="movie-title">{movie.Title}</h5>
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
