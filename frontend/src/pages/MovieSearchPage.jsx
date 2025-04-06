import React, { useState } from "react";
import MovieSearch from "../components/MovieSearch";
import MovieDetails from "../components/MovieDetails";

const MovieSearchPage = () => {
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  return (
    <div className="bg-black min-h-screen text-white">
      {!selectedMovieID ? (
        <MovieSearch onMovieSelect={setSelectedMovieID} />
      ) : (
        <MovieDetails imdbID={selectedMovieID} onBack={() => setSelectedMovieID(null)} />
      )}
    </div>
  );
};

export default MovieSearchPage;
