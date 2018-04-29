import React, { Component } from 'react';
// import Main from './containers/Main/Main';
// import Home from './containers/Home/Home';
// import Auth from './containers/Auth/Auth';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

// redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Loadable from 'react-loadable';

const LoadableMain = Loadable({
  loader: () => import('./containers/Main/Main'),
  loading() {
    return null;
  }
});

const LoadableHome = Loadable({
  loader: () => import('./containers/Home/Home'),
  loading() {
    return null;
  }
});

const LoadableAuth = Loadable({
  loader: () => import('./containers/Auth/Auth'),
  loading() {
    return null;
  }
});

class App extends Component {
  componentDidMount() {
    // console.log('App: componentDidMount()');
    // check auth state when page refreshes
    this.props.onSetGlobalLoading();
    this.props.onCheckAuthState();
  }

  // componentDidUpdate() {
  //   console.log('App: componentDidUpdate()');
  // }

  render() {
    // console.log(this.props.isAuth);

    let routes;

    if (this.props.isAuth) {
      // protected routes
      routes = (
        <Switch>
          <Route path="/notes" component={LoadableMain} />
          <Route path="/" component={LoadableHome} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/account" component={LoadableAuth} />
          <Route path="/" component={LoadableHome} />
        </Switch>
      );
    }

    return routes;
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
