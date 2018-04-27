import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  uid: null,
  expiresDate: null,
  resp: null,
  error: null
};

describe('auth reducer', () => {
  it('SIGN_IN_START: empty all state', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.SIGN_IN_START
      })
    ).toEqual({
      ...initialState
    });
  });

  it('SIGN_IN_SUCCESS: save idToken, uid, expiresDate (based on calculation)', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.SIGN_IN_SUCCESS,
        resp: 'fake response',
        data: {
          idToken: 'fake-idtoken',
          uid: 'fake-uid',
          expiresDate: 3600
        }
      })
    ).toEqual({
      resp: 'fake response',
      idToken: 'fake-idtoken',
      uid: 'fake-uid',
      expiresDate: 3600,
      error: null
    });
  });
});
