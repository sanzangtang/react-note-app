import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import mobilecheck from './utils/mobilecheck';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
// eslint-disable-next-line
import { lighttheme, darktheme } from './constant/theme';
import { Provider } from 'react-redux';
import { store } from './store/store';

let app = (
  <Provider store={store}>
    <MuiThemeProvider theme={lighttheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

// a demo of disabling app on mobile devices
// check doc: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
if (mobilecheck()) {
  app = (
    <h3 style={{ textAlign: 'center' }}>
      Sorry, mobile device is not supported
    </h3>
  );
}

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
