import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import favoriteMovies, { FavoriteMovies } from "./favorite-movies";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { useNavigate } from "react-router";

const ProfileView = ({ movies }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      fetch(`${apiUrl}/users/${user.username}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setUsername(data.username);
          setEmail(data.email);
          setBirthday(data.birthday);
          setFavoriteMovies(data.favoriteMovies || []);
        })
        .catch((error) => {
          console.error(`Error retrieving user information: `, error);
        });
    }
  }, [user, token]);

  const favoriteMoviesList = movies.filter((movie) => {
    return favoriteMovies.includes(movie._id) || [];
  });

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`${apiUrl}/users/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile updated");
        } else {
          alert("Update failed");
        }
      })
      .catch((error) => {
        console.error(`Update error: `, error);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.username} email={user.email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies favoriteMoviesList={favoriteMoviesList} />
    </Container>
  );
};

export default ProfileView;
