import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FloatingLabel,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";

const ProfileView = ({
  user,
  token,
  movies,
  onUserUpdate,
  onUserDelete,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: user.Username || "",
    Password: "",
    Email: user.Email || "",
    Birthday: user.Birthday ? user.Birthday.slice(0, 10) : "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${apiUrl}/users/${user.Username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setSuccess(true);

      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to continue?")) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/${user.Username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to delete account");
      }

      if (onUserDelete) {
        onUserDelete();
      }

      localStorage.clear();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const favoriteMovies =
    Array.isArray(movies) && Array.isArray(user.favoriteMovies)
      ? movies
          .filter((m) => user.favoriteMovies.includes(m.id || m._id))
          .sort((a, b) => a.title.localeCompare(b.title))
      : [];

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h4 className="mb-4">Update {user.Username}'s profile</h4>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Profile updated successfully!</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <FloatingLabel label="Username">
            <Form.Control
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              placeholder="Enter new username"
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <FloatingLabel label="Email">
            <Form.Control
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter new email address"
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel>
            <Form.Control
              type="date"
              name="Birthday"
              value={formData.Birthday}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            className="w-25"
            type="submit"
            style={{ color: "#f0fff0" }}
          >
            Update profile
          </Button>
          <Button
            variant="danger"
            className="w-25"
            onClick={handleDelete}
            style={{ color: "#f0fff0" }}
          >
            Delete account
          </Button>
        </div>
      </Form>

      <hr className="my-4" />
      <h4 className="mb-3">Favorite movies</h4>
      {favoriteMovies.length === 0 ? (
        <p>You don't have any favorite movies. Add some!</p>
      ) : (
        <Row>
          {favoriteMovies.map((movie) => {
            const movieKey = movie.id || movie._id;

            if (!movieKey) {
              return null;
            }

            return (
              <Col md={6} lg={4} key={movie._id} className="mb-3">
                <MovieCard
                  movie={movie}
                  isLoggedIn={true}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                />
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default ProfileView;
