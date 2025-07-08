import React from "react";
import { Button, Card, Col, Figure, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function FavoriteMovies({ favoriteMoviesList, removeFavorite }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite movies</h4>
          </Col>
          <Row>
            {favoriteMoviesList.map(({ image, title, _id }) => {
              const imagePath = image?.imageUrl || "/images/fallback.png";

              return (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  key={_id}
                  className="favorite-movie d-flex flex-column align-items-center mb-4"
                  style={{ minHeight: "350px" }}
                >
                  <Link
                    to={`/movies/${_id}`}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <Figure className="mb-3" style={{ margin: 0 }}>
                      <Figure.Image
                        src={imagePath}
                        alt={title}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <Figure.Caption
                        style={{
                          textAlign: "left",
                          color: "#000",
                          fontWeight: "bold",
                        }}
                      >
                        {title}
                      </Figure.Caption>
                    </Figure>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => removeFavorite(_id)}
                    aria-label={`Remove ${title} from favorites`}
                    style={{ marginTop: "auto", width: "100%" }}
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
      title: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default FavoriteMovies;
