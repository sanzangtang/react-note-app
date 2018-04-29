import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import mobilecheck from './utils/mobilecheck';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// redux and reducers
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import notesReducer from './store/reducers/notes';
import authReducer from './store/reducers/auth';
import globalReducer from './store/reducers/global';

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  _notes: notesReducer,
  _auth: authReducer,
  _global: globalReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// define theme
const lighttheme = createMuiTheme({
  palette: {
    primary: {
      light: '#c3fdff',
      main: '#90caf9',
      dark: '#5d99c6',
      contrastText: '#fafafa'
    },
    secondary: {
      light: '#ffffff',
      main: '#cfd8dc',
      dark: '#9ea7aa',
      contrastText: '#fafafa'
    }
  },
  typography: {
    fontFamily: "'Tajawal', 'Lato', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  }
});

// an alternative color theme
// eslint-disable-next-line
const darktheme = createMuiTheme({
  palette: {
    primary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: "'Tajawal', 'Lato', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  }
});

const app = (
  <Provider store={store}>
    <MuiThemeProvider theme={lighttheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

// the experience of using editor on mobile device is not enjoyful
// simply disable it on all mobile devices for saving styling works
// mobile browser checker docs:
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
const notSupported = <h1>Your Browser Is Not Supported</h1>;

if (!mobilecheck()) {
  ReactDOM.render(app, document.getElementById('root'));
} else {
  ReactDOM.render(notSupported, document.getElementById('root'));
}

registerServiceWorker();
