import React, { Component } from 'react';
import './App.css';
import MainLayout from './containers/MainLayout/MainLayout';
import { Switch, Route } from 'react-router-dom';
import Landpage from './containers/LandPage/LandPage';
import Auth from './containers/Auth/Auth';

class App extends Component {
  componentDidMount() {
    // check auth state here when page refreshes
    console.log('App: componentDidMount()');
  }

  render() {
    // protect routes here
    return (
      <div>
        <Switch>
          <Route path="/notes" component={MainLayout} />
          <Route path="/account" component={Auth} />
          <Route path="/" component={Landpage} />
        </Switch>
      </div>
    );
  }
}

export default App;
