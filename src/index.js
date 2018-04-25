import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import notesReducer from './store/reducers/notes';
import authReducer from './store/reducers/auth';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// redux devtools
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  _notes: notesReducer,
  _auth: authReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// define theme
const theme = createMuiTheme({
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

const app = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
