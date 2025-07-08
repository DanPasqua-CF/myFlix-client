import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

const MovieCard = ({
  movie,
  isLoggedIn,
  isFavorite,
  onToggleFavorite,
  showDetailsButton = true,
}) => {
  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(movie._id);
    }
  };

  return (
    <Card className="movie-card w-100 h-100">
      <Card.Img variant="top" src={movie.image.imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.directors?.map((d) => d.name).join(", ") || "Director unknown"}
        </Card.Text>

        {showDetailsButton && (
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button
              variant="primary"
              className="w-100"
              style={{ color: "#f0fff0" }}
            >
              Open
            </Button>
          </Link>
        )}

        {isLoggedIn && (
          <Button
            variant={isFavorite ? "danger" : "outline-primary"}
            onClick={handleFavoriteClick}
            className="w-100 mt-2"
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  showDetailsButton: PropTypes.bool,
};

export default MovieCard;
