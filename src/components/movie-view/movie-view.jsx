import PropTypes from "prop-types";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      {movie.image?.imageUrl ? (
        <img src={movie.image.imageUrl} alt={movie.title} />
      ) : (
        <img src="/placeholder-image.jpg" alt="placeholder" />
      )}
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
        {movie.directors?.map((director) => director.name).join(", ")}
      </div>
      <button onClick={onBackClick}>Back</button>
    </>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.shape({
      imageUrl: PropTypes.string
    }),
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    )
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default MovieView;
