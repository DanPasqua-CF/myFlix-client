import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card"
import MovieView from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const apiUrl = process.env.MONGODB_URI;

  useEffect(() => {
    /* USE HEROKU URL */
    fetch(`${apiUrl}/movies`)
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.docs.map((doc) => {
        return {
          id: doc.key,
          title: doc.title,
          image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
          director: doc.directors?.[0]
        };
      });
      
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
