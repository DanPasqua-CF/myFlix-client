import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <FloatingLabel>
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
        <FloatingLabel>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <FloatingLabel>
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <FloatingLabel>
          <Form.Control
            type="date"
            placeholder="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignupView;
