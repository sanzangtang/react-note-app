import React from 'react';
import { Link } from 'react-router-dom';

const landpage = () => {
  return (
    <div>
      <h1>This is the land page</h1>
      <Link to="/notes">Start Here</Link>
    </div>
  );
};

export default landpage;
