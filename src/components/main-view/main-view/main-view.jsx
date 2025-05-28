import { useState } from "react";
import { MovieCard } from "../../movie-card/movie-card"
import { MovieView } from "../../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Eloquent JavaScript" },
    { id: 2, title: "Mastering JavaScript Functional Programming" },
    { id: 3, title: "JavaScript: The Good Parts" },
    { id: 4, title: "JavaScript: The Definitive Guide" },
    { id: 5, title: "The Road to React" }
  ]);

  const [ selectedMovie, setSelectedMovie ] = useState(null);

  if (selectedMovie) {
    return <MovieView movie = { selectedMovie } onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}
