import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card"
import MovieView from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(`API URL: ${apiUrl}`);

  useEffect(() => {
    fetch(`${apiUrl}/movies`)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Movies from API`, data);

      if (!Array.isArray(data)) {
        console.error("Unexpected API format", data);
        return;
      }

      const moviesFromApi = data.map((doc) => ({
        id: doc._id,
        title: doc.title,
        description: doc.description,
        image: {
          imageUrl: doc.imageUrl
        },
        directors: doc.directors || []
      }));
      
      setMovies(moviesFromApi);
    });
  }, []);

  const [ selectedMovie, setSelectedMovie ] = useState(null);

  if (selectedMovie) {
    return <MovieView movie = { selectedMovie } onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </>
  );
}

export default MainView;
