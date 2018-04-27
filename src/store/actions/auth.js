import * as actionTypes from './actionTypes';
import axiosIns from './axiosIns';
import * as errorActions from './error';

// your firebase api key
const apiKey = 'AIzaSyCrlk7RKN_0uXLVij-3Y8OrFScuK0zUlLw';

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

export const signInSuccess = (resp, data) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    resp: resp,
    data: data
  };
};

export const signInFail = error => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    error: error
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

        // const data = {
        //   idToken: idToken,
        //   uid: uid,
        //   expiresDate: expiresDate
        // };

        // store data in local
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('uid', uid);
        localStorage.setItem('expiresDate', expiresDate);

        // dispatch(signInSuccess(resp, data));

        dispatch(checkAuthStateAsync());

        // redirecting
        props.history.push('/notes');
      })
      .catch(error => {
        console.log(error);
        dispatch(errorActions.setGlobalError(error));
      });
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
      console.log(expiresDate - timeNow);
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
