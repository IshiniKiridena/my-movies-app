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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h2>{movie.movie}</h2>
            <p>Rating: {movie.rating}</p>
            <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer">
              View on IMDb
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
