import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./movie-view.scss";

const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);


  return (
    <>
      {movie.image?.imageUrl ? (
        <img src={movie.image.imageUrl} alt={movie.title} height={350} width={250} />
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
      <Link to={'/'}>
        <button className="back-button">Back</button>
      </Link>
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
};

export default MovieView;
