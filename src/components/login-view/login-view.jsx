import PropTypes from "prop-types";
import { React, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isButtonDisabled = username.trim() === "" || password.trim() === "";

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("YOUR_API_URL/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(`Login response: `, data);

      if (data.user && data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      }
      else {
        alert('User does not exist');
      }
    })
    .catch((e) => {
      alert('Something went wrong');
      console.error(`Login error: ${e}`);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
          <Form.Control
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isButtonDisabled}>Submit</Button>
    </Form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}

export default LoginView;
