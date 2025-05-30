import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <>
      <div>
        <img className="w-100" src={movie.image.imageUrl} alt={movie.title} />
      </div>
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
        {movie.directors.map((director) => director.name).join(", ")}
      </div>
      <Link to={'/'}>
        <button className="back-button">Back</button>
      </Link>
    </>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    directors: PropTypes.string.isRequired
  }).isRequired,
};

export default MovieView;
