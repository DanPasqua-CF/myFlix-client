import React from "react";
import { Button, Card, Col, Figure, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMoviesList, removeFavorite }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h2>Favorite Movies</h2>
          </Col>
          <Row>
            {favoriteMoviesList.map(({ ImagePath, Title, _id }) => {
              return (
                <Col xs={12} md={6} lg={3} key={_id} className="favorite-movie">
                  <Figure>
                    <Link to={`/movies/${_id}`}>
                      <Figure.Image src={ImagePath} alt={Title}></Figure.Image>
                      <Figure.Caption>{Title}</Figure.Caption>
                    </Link>
                  </Figure>

                  <h3>{Title}</h3>
                  <Button
                    variant="secondary"
                    onClick={() => removeFavorite(_id)}
                  >
                    Remove
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
}

FavoriteMovies.propTypes = {
  favoriteMoviesList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default FavoriteMovies;
