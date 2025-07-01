import React from "react";
import PropTypes from "prop-types";
import { Form, Button, FloatingLabel } from "react-bootstrap";

function UpdateUser({ user, handleSubmit, handleUpdate }) {
  return (
    <Form className="profile-form" onSubmit={handleSubmit}>
      <h2 className="mb-4">Update Profile</h2>

      <FloatingLabel
        controlId="floatingUsername"
        label="Username"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="username"
          defaultValue={user.username}
          onChange={handleUpdate}
          placeholder="Username"
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          name="password"
          onChange={handleUpdate}
          placeholder="Password"
          minLength="8"
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingEmail"
        label="Email address"
        className="mb-4"
      >
        <Form.Control
          type="email"
          name="email"
          defaultValue={user.email}
          onChange={handleUpdate}
          placeholder="name@example.com"
          required
        />
      </FloatingLabel>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

UpdateUser.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdateUser;
