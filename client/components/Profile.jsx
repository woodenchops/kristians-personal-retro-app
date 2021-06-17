import React from 'react';

function Profile({ user }) {
  const { name } = user;

  return (
    <div>
      <h1>Profile page</h1>
      <p>Hi, {name}</p>
    </div>
  );
}

export default Profile;
