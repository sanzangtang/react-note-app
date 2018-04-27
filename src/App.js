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
    // check auth state here when page refreshes
    this.props.onCheckAuthState();
    console.log('App: componentDidMount()');
  }

  render() {
    // protect routes here
    return (
      <div>
        <Switch>
          <Route path="/notes" component={Main} />
          <Route path="/account" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
