import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import './movie-card.scss';

const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card w-100 h-100">
      <Card.Img variant="top" src={movie.image.imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.directors.map((d) => d.name).join(", ")}</Card.Text>
        <Link to={`movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
