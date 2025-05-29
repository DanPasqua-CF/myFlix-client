import React from "react";
import PropTypes from "prop-types";

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
      <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
    </>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    directors: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default MovieView;
