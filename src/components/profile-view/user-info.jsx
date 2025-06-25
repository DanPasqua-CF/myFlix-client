import React from "react";

function UserInfo({ email, username }) {
  return (
    <>
      <h4>Your information</h4>
      <p>Name: {username}</p>
      <p>E-mail address: {email}</p>
    </>
  )
}

export default UserInfo;
