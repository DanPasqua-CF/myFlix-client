import React from "react";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}    
    >
      <strong>{movie.title}</strong>
    </div>
  )
}

export default MovieCard;
