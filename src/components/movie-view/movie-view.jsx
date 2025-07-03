import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

const MovieView = ({ movies, user, onToggleFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const isFavorite = user?.favorites?.includes(movie.id) || false;

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(movie.id);
    }
  };

  return (
    <>
      {movie.image?.imageUrl ? (
        <img
          src={movie.image.imageUrl}
          alt={movie.title}
          height={350}
          width={250}
        />
      ) : (
        <img src="/placeholder-image.jpg" alt="placeholder" />
      )}
      <div>
        <strong>Title: </strong>
        {movie.title}
      </div>

      <div>
        <strong>Genre: </strong>
        {Array.isArray(movie.genre)
          ? movie.genre.map((g) => g.name).join(", ")
          : movie.genre?.name}
      </div>
      <div>
        <strong>Description: </strong>
        {movie.description}
      </div>
      <div>
        <strong>Director: </strong>
        {movie.directors?.map((director) => director.name).join(", ")}
      </div>

      {user && onToggleFavorite && (
        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={handleFavoriteClick}
          style={{
            marginTop: "10px",
            backgroundColor: isFavorite ? "#dc3545" : "#0d6efd",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      )}

      <Link to={"/"}>
        <button className="back-button" style={{ marginTop: "20px" }}>
          Back
        </button>
      </Link>
    </>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
