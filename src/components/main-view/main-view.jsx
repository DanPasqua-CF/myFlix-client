import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card"
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const apiUrl = process.env.MONGODB_URI;

  useEffect(() => {
    if (!token) {
      return;
    }

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
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView 
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} 
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return <MovieView movie = { selectedMovie } onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
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
};

export default MainView;
