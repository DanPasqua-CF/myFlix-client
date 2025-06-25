import React from "react";

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Update</h2>
        <Form>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.username}
              onChange={e => handleUpdate(e) }
              required
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              defaultValue=""
              onChange={e => handleUpdate(e) }
              required
              minLength="8"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              defaultValue={user.email}
              onChange={e => handleUpdate(e) }
              required
              placeholder="Email address"
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>


        <label>Password:</label>
        <input 
          type="password"
          name="password"
          defaultValue={user.password}
          onChange={e => handleUpdate(e) } 
        />

        <label>Email address:</label>
        <input 
          type="email"
          name="email"
          defaultValue={user.email}
          onChange={e => handleUpdate(e) } 
        />

        <button variant="primary" type="submit">Update</button>
      </form>
  );
}

export default UpdateUser;
