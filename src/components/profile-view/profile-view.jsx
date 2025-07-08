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
import UpdateUser from "../update-user/update-user";

const ProfileView = ({ user, token, movies, onUserUpdate, onUserDelete }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user.username || "",
    password: "",
    email: user.email || "",
    birthday: user.birthday ? user.birthday.slice(0, 10) : "",
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
      const payload = {
        username: formData.username,
        email: formData.email,
        birthday: formData.birthday,
        ...(formData.password && { password: formData.password }),
      };

      const response = await fetch(`${apiUrl}/users/${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setSuccess(true);
      localStorage.setItem("user", JSON.stringify(updatedUser));

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
      const response = await fetch(`${apiUrl}/users/${user.username}`, {
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
      <h4 className="mb-4">Update profile</h4>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Profile updated successfully!</Alert>
      )}

      <UpdateUser
        user={user}
        formData={formData}
        handleUpdate={handleChange}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      />

      <hr className="my-4" />
      <h4 className="mb-3">Favorite movies</h4>
      {favoriteMovies.length === 0 ? (
        <p>You don't have any favorite movies. Add some!</p>
      ) : (
        <ul>
          {favoriteMovies.map((movie) => (
            <li key={movie._id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ProfileView;
