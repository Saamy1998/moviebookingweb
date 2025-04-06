import React, { useEffect, useState } from "react";
import axios from "axios";
import Showtimes from "./Showtimes";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetails = ({ imdbID, onBack }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      setMovie(res.data);
    };
    fetchDetails();
  }, [imdbID]);

  if (!movie) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-6 text-white">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-700 rounded">← Back</button>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={movie.Poster} alt={movie.Title} className="w-64 h-auto rounded" />
        <div>
          <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>

      <Showtimes movieTitle={movie.Title} />
    </div>
  );
};

export default MovieDetails;
