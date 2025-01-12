import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import axios from 'axios';
import logo from './assets/Logo.png'; // Import the logo image

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query

  // Function to fetch movies from multiple genres
  const fetchMovies = async () => {
    setLoading(true); // Start loading
    const genres = ['action', 'comedy', 'drama', 'romance'];
    const moviePromises = genres.map((genre) =>
      axios.get(`http://www.omdbapi.com/?s=${genre}&apikey=${import.meta.env.VITE_API_KEY}`)
    );
    
    try {
      const responses = await Promise.all(moviePromises);
      const allMovies = responses.reduce((acc, response) => {
        if (response.data.Response !== 'False') {
          acc.push(...response.data.Search);
        }
        return acc;
      }, []);
      setMovies(allMovies); // Combine all movie results
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch movies when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query); // Update the search query
    setLoading(true); // Start loading when searching
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_API_KEY}`);
      if (response.data.Response === 'False') {
        alert('No movies found');
        setMovies([]); // Clear movies when no results
      } else {
        setMovies(response.data.Search || []);
      }
      setSelectedMovie(null); // Reset selected movie when searching new results
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleClickMovie = (imdbID) => {
    setSelectedMovie(imdbID);
  };

  // Handle going back to movie list
  const handleBackToList = () => {
    setSelectedMovie(null); // Reset the selected movie
  };

  // Handle the refresh button click
  const handleRefresh = () => {
    fetchMovies(); // Fetch the movies again to refresh the list
  };

  // Suggest some popular movie titles when no movies are found
  const getSuggestions = () => {
    const suggestions = [
      "The Dark Knight",
      "Inception",
      "The Shawshank Redemption",
      "The Godfather",
      "Forrest Gump",
      "Avengers: Endgame",
      "Pulp Fiction",
      "The Matrix",
      "Interstellar",
      "The Lion King",
    ];
    return suggestions;
  };

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      {/* Header Section with Logo and App Name */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* Logo */}
          <img src={logo} alt="App Logo" className="h-12 w-auto mr-3" />
          {/* App Name */}
          <h1 className="text-3xl font-bold">Movie Explorer</h1>
        </div>
        {/* Refresh Button */}
        <button onClick={handleRefresh} className="bg-blue-500 w-20 rounded text-white hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {/* Show a loading spinner if data is being fetched */}
      {loading ? (
        <div className="flex justify-center items-center my-8">
          <div className="spinner-border animate-spin border-4 rounded-full border-blue-500 border-t-transparent w-12 h-12"></div>
        </div>
      ) : selectedMovie ? (
        <MovieDetails imdbID={selectedMovie} onBackToList={handleBackToList} />
      ) : (
        <>
          <MovieList movies={movies} onClickMovie={handleClickMovie} />
          {/* Show suggestions if no movies are found */}
          {movies.length === 0 && searchQuery && (
            <div className="mt-8 text-center">
              <h2 className="text-xl font-bold mb-4">No movies found for "{searchQuery}"</h2>
              <h3 className="text-lg">Here are some suggestions:</h3>
              <ul className="list-disc list-inside mt-4">
                {getSuggestions().map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleSearch(suggestion); // Trigger search for the suggested movie
                    }}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Footer Section */}
      <footer className="mt-auto bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 Movie Explorer. All rights reserved. Segera Amos</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/terms" className="text-white hover:text-gray-400">Terms</a>
          <a href="/privacy" className="text-white hover:text-gray-400">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default App;






