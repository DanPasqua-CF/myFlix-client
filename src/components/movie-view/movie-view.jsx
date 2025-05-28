import React from "react";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      <div>
        <img src={movie.image.imageUrl} alt={movie.title} />
      </div>
      <div>
        <strong>Title: </strong>
        {movie.title}
      </div>
      <div>
        <strong>Description: </strong>
        {movie.description}
      </div>
      <div>
        <strong>Director: </strong>
        {movie.directors.map((director) => director.name).join(", ")}
      </div>
      <button onClick={onBackClick}>Back</button>
    </>
  );
};

export default MovieView;
