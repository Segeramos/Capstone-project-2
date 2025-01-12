import React from 'react';

const MovieList = ({ movies, onClickMovie }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          onClick={() => onClickMovie(movie.imdbID)}
          className="cursor-pointer border rounded-lg p-2"
        >
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'}
            alt={movie.Title}
            className="w-full h-auto rounded"
          />
          <h3 className="mt-2 text-xl font-semibold">{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
