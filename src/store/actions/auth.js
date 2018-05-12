import * as actionTypes from './actionTypes';
import axiosIns from './axiosIns';
import * as globalActions from './global';

// your firebase api key
const apiKey = process.env.REACT_APP_API_KEY;

// eslint-disable-next-line
const signUpUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
  apiKey;
const signInUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
  apiKey;

export const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START
  };
};

export const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START
  };
};

export const signInAsync = (userData, props) => {
  return (dispatch, getState) => {
    dispatch(signInStart());

    // user email and password to send
    const postData = {
      ...userData,
      returnSecureToken: true
    };

    axiosIns
      .post(signInUrl, postData)
      .then(resp => {
        // prepare data
        const idToken = resp.data.idToken;
        const uid = resp.data.localId;
        const expiresDate =
          +resp.data.expiresIn + Math.floor(new Date().getTime() / 1000);

        // store data in local
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('uid', uid);
        localStorage.setItem('expiresDate', expiresDate);

        dispatch(checkAuthStateAsync());

        // redirecting
        props.history.push('/notes');
      })
      .catch(error => {
        dispatch(globalActions.setGlobalError(error));
      });
  };
};

export const signUpAsync = (userData, props) => {
  return dispatch => {
    dispatch(signUpStart());
  };
};

export const checkAuthStateAsync = () => {
  return dispatch => {
    const idToken = localStorage.getItem('idToken');
    const uid = localStorage.getItem('uid');
    const expiresDate = localStorage.getItem('expiresDate');

    const timeNow = Math.floor(new Date().getTime() / 1000);

    const data = {
      idToken,
      uid,
      expiresDate
    };

    // check if not null
    if (idToken && uid && expiresDate) {
      // console.log(expiresDate - timeNow);
      // it token does not expire
      if (expiresDate - timeNow > 0) {
        // set redux state
        dispatch(setAuthState(data));

        // auto clear auth state
        setTimeout(() => {
          dispatch(clearAuthStateAndStorage());
        }, (expiresDate - timeNow) * 1000); // milliseconds
      } else {
        dispatch(clearAuthStateAndStorage()); // mainly for clear local storage
      }
    }
  };
};

export const setAuthState = data => {
  return {
    type: actionTypes.SET_AUTH_STATE,
    data: data
  };
};

export const confirmLogout = () => {
  return {
    type: actionTypes.CONFIRM_LOGOUT
  };
};

// this will be called if idtoken is not valid
// or any error occurs to prevent harmful results
export const clearAuthStateAndStorage = () => {
  // remove local storage
  localStorage.removeItem('idToken');
  localStorage.removeItem('uid');
  localStorage.removeItem('expiresDate');
  return {
    type: actionTypes.CLEAR_AUTH_STATE
  };
};
