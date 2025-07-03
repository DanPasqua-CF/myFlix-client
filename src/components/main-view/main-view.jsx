import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";
import PropTypes from "prop-types";
import UpdateUser from "../update-user/update-user";

import "./main-view.scss";

const MainView = ({ user: initialUser, token, onLoggedOut }) => {
  const [user, setUser] = useState(initialUser);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    fetch(`${apiUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          onLoggedOut();
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Movies from API:", data);

        const moviesFromApi = data.map((doc) => ({
          id: doc._id,
          title: doc.title,
          genre: doc.genre,
          description: doc.description,
          image: {
            imageUrl: doc.imageUrl,
          },
          directors: doc.directors || [],
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error returning movies: ", error);
      });
  }, [token]);

  const handleUserUpdate = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleUserDelete = () => {
    onLoggedOut();
    localStorage.clear();
    navigate("/login");
  };

  const onToggleFavorite = (movieId) => {
    if (!user || !token) {
      return;
    }

    const isFavorite = user?.favoriteMovies?.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST";

    fetch(`${apiUrl}/users/${user.username}/favoriteMovies/${movieId}`, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Update failed");
        }
        return response.json();
      })
      .then((updatedUserResponse) => {
        const updatedUser = updatedUserResponse.user || updatedUserResponse;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => {
        console.error("Failed to update favorites: ", err);
      });
  };

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const isLoggedIn = Boolean(user && token);

  return (
    <>
      <NavigationBar
        user={user}
        onLoggedOut={onLoggedOut}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="main-view-container p-4">
        <Row className="justify-content-md-center flex-grow-1">
          <Routes>
            <Route
              path="/movies/:movieId"
              element={
                movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )
              }
            />
            <Route
              path="/users/:username"
              element={
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    onUserUpdate={handleUserUpdate}
                    onUserDelete={handleUserDelete}
                    onToggleFavorite={onToggleFavorite}
                  />
                </Col>
              }
            />
            <Route
              path="/"
              element={
                movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : filteredMovies.length === 0 ? (
                  <Col>No movies found.</Col>
                ) : (
                  filteredMovies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard
                        movie={movie}
                        isLoggedIn={isLoggedIn}
                        isFavorite={user?.favoriteMovies?.includes(movie.id)}
                        onToggleFavorite={onToggleFavorite}
                      />
                    </Col>
                  ))
                )
              }
            />
            <Route
              path="*"
              element={
                <Col md={8}>
                  <h3>404 Page Not Found</h3>
                  <p>The page you're looking for doesn't exist.</p>
                </Col>
              }
            />
          </Routes>
        </Row>
      </div>
    </>
  );
};

MainView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  onLoggedOut: PropTypes.object.isRequired,
};

export default MainView;
