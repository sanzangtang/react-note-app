import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    console.log('Home: componentDidMount()');
  }

  componentDidUpdate() {
    console.log('Home: componentDidUpdate()');
  }

  render() {
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
  }
}

export default Home;
