import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(localUser?.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(localUser?.email || "");
  const [birthday, setBirthday] = useState(localUser?.birthday || "01/01/0001");

  if (!localUser) {
    return <p>Log in to access your profile</p>
  }

  const favoriteMovies = movies.filter((movie) => {
    return localUser.favoriteMovies?.includes(movies._id);
  });

  const handleSubmit
};

export default ProfileView;
