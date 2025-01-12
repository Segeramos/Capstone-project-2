import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = ({ imdbID, onBackToList }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_API_KEY}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Something went wrong. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetails) {
    return <div>No details available</div>;
  }

  const { Title, Plot, Actors, Ratings, Genre } = movieDetails;

  return (

    <div>
    <div className="movie-details bg-slate-700 text-white w-1/2 mx-auto text-center">
      <h2 className='text-2xl font-extrabold'>{Title}</h2>
      <p><strong>Plot:</strong> {Plot}</p>
      <p><strong>Cast:</strong> {Actors}</p>
      <p><strong>Genre:</strong> {Genre}</p>
      <h3>Ratings:</h3>
      <ul>
        {Ratings && Ratings.map((rating) => (
          <li key={rating.Source}>
            {rating.Source}: {rating.Value}
          </li>
        ))}
      </ul>
    </div>
    {/* Back to movie list button */}
    <button onClick={onBackToList} className="btn-back bg-blue-500 rounded-lg p-3 text-white hover:bg-blue-700 animate-bounce">Back to Movie List</button>
    </div>
  );
};

export default MovieDetails;