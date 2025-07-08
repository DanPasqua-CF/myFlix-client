import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./signup-view.scss";

const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const isButtonDisabled =
    username.trim() === "" ||
    password.trim() === "" ||
    email.trim() === "" ||
    !birthday;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday ? birthday.toISOString().split("T")[0] : "",
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
      <Form.Group controlId="formUsername" className="mb-3">
        <FloatingLabel controlId="floatingSignupUsername" label="Username">
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

      <Form.Group controlId="formUsername" className="mb-3">
        <FloatingLabel controlId="floatingSignupPassword" label="Password">
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

      <Form.Group controlId="formEmail" className="mb-3">
        <FloatingLabel controlId="floatingEmail" label="Email address">
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mb-3">
        <FloatingLabel
          controlId="floatingBirthday"
          label={birthday ? "" : "mm/dd/yyyy"}
        >
          <DatePicker
            selected={birthday}
            onChange={(date) => setBirthday(date)}
            dateFormat="MM/dd/yyyy"
            className="form-control"
            placeholderText="mm/dd/yyyy"
            required
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
  );
};

export default SignupView;
