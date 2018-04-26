import * as actionTypes from './actionTypes';

export const setGlobalError = error => {
  return {
    type: actionTypes.SET_GLOBAL_ERROR,
    error: error
  };
};

export const clearGlobalError = () => {
  return {
    type: actionTypes.CLEAR_GLOBAL_ERROR
  };
};
