import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card"
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./main-view.scss";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 401 || response.status === 403) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Movies from API:", data);
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

  return (
    <BrowserRouter>
      <NavigationBar 
        user={user} 
        onLoggedOut={() => {
          setUser(null);
		      setToken(null);
		      localStorage.clear();
		      localStorage.removeItem('user');
		      localStorage.removeItem('token');
        }} 
      />

      <div className="main-view-container">
      <Row className="justify-content-md-center flex-grow-1">
        <Routes>
          <Route
            path="/users"
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
                  <Col>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
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
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
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
                  <Navigate to="login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
      </div>
    </BrowserRouter>
  );
};

export default MainView;
