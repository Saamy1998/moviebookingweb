import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieSearch = ({ onMovieSelect }) => {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query = search, releaseYear = year) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&y=${releaseYear}&apikey=${API_KEY}`
      );
      setMovies(response.data.Search || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch default movies on first load
    handleSearch("Avengers");
  }, []);

  return (
    <div className="p-4 pb-0">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Movie Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={() => handleSearch()}
          className="px-4 py-2 bg-red-600 rounded text-white"
        >
          Search
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => onMovieSelect(movie.imdbID)}
            className="cursor-pointer bg-gray-800 p-4 rounded"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-bold">{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
