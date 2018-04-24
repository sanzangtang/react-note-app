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
    type: actionTypes.SIGN_IN_STAERT
  };
};

export const signInSuccess = () => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS
  };
};

export const signInFail = () => {
  return {
    type: actionTypes.SIGN_IN_FAIL
  };
};

export const signInAsync = () => {
  return (dispatch, getState) => {};
};
