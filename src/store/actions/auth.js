import * as actionTypes from './actionTypes';
import axiosIns from './axiosIns';

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

export const signInSuccess = resp => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    resp: resp
  };
};

export const signInFail = error => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    error: error
  };
};

export const signInAsync = userData => {
  return (dispatch, getState) => {
    dispatch(signInStart());
    const postData = {
      ...userData,
      returnSecureToken: true
    };
    axiosIns
      .post(signInUrl, postData)
      .then(resp => {
        // add idToken, uid expirationDate to localStorage
        dispatch(signInSuccess(resp));
      })
      .catch(error => {
        dispatch(signInFail(error));
      });
  };
};

export const checkAuthState = () => {
  // check current date < expirationDate and idToken uid are not null
  // if true refill redux state with idToken, uid
  // else clear localStorage, and clear redux auth state
};
