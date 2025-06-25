import React from "react";
import { Button, Card, Col, Figure, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMoviesList }) {
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

                  <Link to={`movies/${movies._id}`}>
                    <h3>movies.title</h3>
                  </Link>
                  <Button
                    variant="secondary"
                    onClick={() => removeFavorite(movies._id)}
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

export default FavoriteMovies;
