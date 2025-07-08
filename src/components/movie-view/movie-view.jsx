import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card";
import "./movie-view.scss";

const MovieView = ({ movies, user, onToggleFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id?.toString() === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const isFavorite = user?.favoriteMovies?.includes(movie._id);

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(movie._id);
    }
  };

  return (
    <div className="movie-view-container">
      <MovieCard
        movie={movie}
        isLoggedIn={!!user}
        isFavorite={!!isFavorite}
        onToggleFavorite={onToggleFavorite}
        showDetailsButton={false}
      />

      <div className="mt-4">
        <h5>Description:</h5>
        <p>{movie.description}</p>

        <h5>Genre:</h5>
        <p>
          {Array.isArray(movie.genre)
            ? movie.genre.map((g) => g.name).join(", ")
            : movie.genre?.name}
        </p>

        <h5>Directors</h5>
        <p>
          {movie.directors?.map((director) => director.name).join(", ") ||
            "Director unknown"}
        </p>

        <div className="button-row">
          <Link to={"/"}>
            <Button variant="primary" className="back-button">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          })
        ),
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ]),
      description: PropTypes.string.isRequired,
      image: PropTypes.shape({
        imageUrl: PropTypes.string,
      }),
      directors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  user: PropTypes.shape({
    favorites: PropTypes.arrayOf(PropTypes.string),
  }),
  onToggleFavorite: PropTypes.func,
};

export default MovieView;
