import React from "react";
import PropTypes from "prop-types";

function UserInfo({ email, username }) {
  return (
    <>
      <h4>Your information</h4>
      <p>Name: {username}</p>
      <p>E-mail address: {email}</p>
    </>
  );
}

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default UserInfo;
