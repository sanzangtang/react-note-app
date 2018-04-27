import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  uid: null,
  expiresDate: null,
  resp: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // MUST clear all properties
    case actionTypes.SIGN_IN_START:
      return {
        ...state,
        idToken: null,
        uid: null,
        resp: null,
        error: null
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        resp: action.resp,
        idToken: action.data.idToken,
        uid: action.data.uid,
        expiresDate: action.data.expiresDate
      };
    case actionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        error: action.error
      };
    case actionTypes.CHECK_AUTH_STATE:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;
