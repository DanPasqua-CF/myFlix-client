import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="w-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.directors}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
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
