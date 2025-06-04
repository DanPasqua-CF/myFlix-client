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
