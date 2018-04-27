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
        console.log('success');
        // prepare data
        const idToken = resp.data.idToken;
        const uid = resp.data.localId;
        const expiresDate =
          +resp.data.expiresIn + Math.floor(new Date().getTime() / 1000);

        const data = {
          idToken: idToken,
          uid: uid,
          expiresDate: expiresDate
        };

        // store data in local
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('uid', uid);
        localStorage.setItem('expiresDate', expiresDate);

        dispatch(signInSuccess(resp, data));

        // redirecting
        props.history.push('/notes');
      })
      .catch(error => {
        console.log(error);
        dispatch(errorActions.setGlobalError(error));
      });
  };
};

export const checkAuthState = () => {
  // check current date < expirationDate and idToken uid are not null
  // if true refill redux state with idToken, uid
  // else clear localStorage, and clear redux auth state

  // const expiresDate = localStorage.getItem('expiresDate');
  // console.log(expiresDate);
  return {
    type: actionTypes.CHECK_AUTH_STATE
  };
};

export const clearAuthState = () => {
  // logout
};
