import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SignupView from "../signup-view/signup-view";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isButtonDisabled = username.trim() === "" || password.trim() === "";
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Login response: `, data);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          navigate("/");
        } else {
          alert("User does not exist");
        }
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(`Login error: ${error}`);
      });
  };

  return (
    <Container>
      <Card className="p-4 mb-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h5 className="mb-4 text-left" style={{ color: "#495057" }}>
          Log in
        </h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <FloatingLabel controlId="floatingLoginUsername" label="Username">
              <Form.Control
                type="text"
                size="sm"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={5}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <FloatingLabel controlId="floatingLoginPassword" label="Password">
              <Form.Control
                type="password"
                size="sm"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </FloatingLabel>
          </Form.Group>

          <Row>
            <Col>
              <Button
                variant="primary"
                type="submit"
                disabled={isButtonDisabled}
                className="w-25"
                style={{ color: "#f0fff0" }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <p className="text-center" style={{ color: "#495057" }}>
        If you don't have a profile, please sign up below.
      </p>

      <Card className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h5 className="mb-4 text-left" style={{ color: "#495057" }}>
          Sign up
        </h5>
        <SignupView />
      </Card>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
