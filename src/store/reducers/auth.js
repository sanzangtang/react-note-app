import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  uid: null,
  expiresIn: null,
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
        expiresIn: null,
        resp: null,
        error: null
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        resp: action.resp,
        idToken: action.resp.data.idToken,
        uid: action.resp.data.localId,
        expiresIn: action.resp.data.expiresIn
      };
    case actionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
