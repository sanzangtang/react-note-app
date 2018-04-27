import React from 'react';
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <div>
      <h1>This is the land page</h1>
      <p>
        <Link to="/notes">Start Here</Link>
      </p>
      <p>
        <Link to="/account">Sign In</Link>
      </p>
    </div>
  );
};

export default home;
