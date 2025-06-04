import PropTypes from "prop-types";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}    
    >
      <strong>{movie.title}</strong>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;
