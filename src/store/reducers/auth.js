import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  uid: null,
  expiresDate: null,
  ifLogout: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // MUST clear all properties
    case actionTypes.SIGN_IN_START:
      return {
        ...state,
        idToken: null,
        uid: null,
        expiresDate: null,
        ifLogout: false
      };
    case actionTypes.SIGN_UP_START:
      return {
        ...state
      };
    case actionTypes.SET_AUTH_STATE:
      return {
        ...state,
        idToken: action.data.idToken,
        uid: action.data.uid,
        expiresDate: action.data.expiresDate
      };
    case actionTypes.CLEAR_AUTH_STATE: // this is not necssary currently
      return {
        ...state,
        idToken: null,
        uid: null,
        expiresDate: null,
        ifLogout: true
      };
    case actionTypes.CONFIRM_LOGOUT:
      return {
        ...state,
        ifLogout: false
      };
    default:
      return state;
  }
};

export default reducer;
