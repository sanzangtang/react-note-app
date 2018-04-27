import React, { Component } from 'react';
import Main from './containers/Main/Main';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.css';

// redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    console.log('App: componentDidMount()');
    // check auth state when page refreshes
    this.props.onSetGlobalLoading();
    this.props.onCheckAuthState();
  }

  componentDidUpdate() {
    console.log('App: componentDidUpdate()');
  }

  render() {
    console.log(this.props.isAuth);

    let routes;

    if (this.props.isAuth) {
      // protected routes
      routes = (
        <Switch>
          <Route path="/notes" component={Main} />
          <Route path="/" component={Home} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/account" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      );
    }

    return <div>{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state._auth.idToken !== null // a handy way (based on idToken)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthStateAsync()),
    onSetGlobalLoading: () => dispatch(actions.setGlobalLoading())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
