import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
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
  const [selectedMovie, setSelectedMovie] = useState(null);
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
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView 
          onLoggedIn={(user) => { 
            setUser(user); 
            setToken(token); 
            localStorage.clear(); 
          }} 
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      ): movies.length === 0 ? (
        <div>The list is empty</div>
      ) : (
        <>
          {movies.map((movie) => {
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard 
                movie={movie} 
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }} 
              />
            </Col>
          })}
        </>
      )}
    </Row>
  )
};

export default MainView;
