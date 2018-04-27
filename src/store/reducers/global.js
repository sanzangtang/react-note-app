import * as actionTypes from '../actions/actionTypes';

const initialState = {
  gError: null,
  gLoading: false
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
    case actionTypes.SET_GLOBAL_LOADING:
      return {
        ...state,
        gLoading: true
      };
    case actionTypes.CLEAR_GLOBAL_LOADING:
      return {
        ...state,
        gLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
