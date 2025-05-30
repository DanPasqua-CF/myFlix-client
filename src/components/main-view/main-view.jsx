import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card"
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Col } from "react-bootstrap";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    /* USE HEROKU URL */
    fetch("https://openlibrary.org/movies", { headers: { Authorization: `Bearer ${token}`}})
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



  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          <Route 
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route 
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user); 
                      setToken(token);
                    }}/>
                  </Col>
                )}
              </>
            }
          />

          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movie={movie} />
                  </Col>
                )}
              </>
            }
          />

          <Route 
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <>
                    {movies.map((movie) => {
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    })}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>  
  );
};

export default MainView;
