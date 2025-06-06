import PropTypes from "prop-types";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}
    >
      <img
        src={movie.image?.imageUrl || "/placeholder-image.jpg"}
        alt={movie.title}
      />
      <strong>{movie.title}</strong>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.shape({
      imageUrl: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
