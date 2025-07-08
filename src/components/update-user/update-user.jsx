import React from "react";
import PropTypes from "prop-types";
import { Form, Button, FloatingLabel } from "react-bootstrap";

function UpdateUser({
  user,
  formData,
  handleSubmit,
  handleUpdate,
  handleDelete,
}) {
  return (
    <Form className="profile-form" onSubmit={handleSubmit}>
      <FloatingLabel
        controlId="floatingUsername"
        label="Username"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleUpdate}
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
          value={formData.password}
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
          value={formData.email}
          onChange={handleUpdate}
          placeholder="name@example.com"
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingBirthday"
        label="Birthday"
        className="mb-4"
      >
        <Form.Control
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleUpdate}
        />
      </FloatingLabel>

      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          type="submit"
          style={{ width: "48%", color: "#f0fff0" }}
        >
          Submit
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={handleDelete}
          style={{ width: "48%", color: "#f0fff0" }}
        >
          Delete account
        </Button>
      </div>
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
