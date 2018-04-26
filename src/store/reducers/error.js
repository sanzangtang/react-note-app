import * as actionTypes from '../actions/actionTypes';

const initialState = {
  gError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GLOBAL_ERROR:
      return {
        ...state,
        gError: action.error // firebase can use error.message
      };
    case actionTypes.CLEAR_GLOBAL_ERROR:
      return {
        ...state,
        gError: null
      };
    default:
      return state;
  }
};

export default reducer;
