import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Movie List</h1>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-item">
            <img
              src={process.env.PUBLIC_URL + '/' + movie.image}
              alt={movie.movie}
              className="movie-image"
            />
            <div className="movie-details">
              <h2 className="movie-title">{movie.movie}</h2>
              <p className="movie-rating">Rating: {movie.rating}</p>
              <a
                href={movie.imdb_url}
                target="_blank"
                rel="noopener noreferrer"
                className="imdb-link"
              >
                View on IMDb
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
