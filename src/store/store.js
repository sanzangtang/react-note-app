// redux and reducers
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import notesReducer from './reducers/notes';
import authReducer from './reducers/auth';
import globalReducer from './reducers/global';

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  _notes: notesReducer,
  _auth: authReducer,
  _global: globalReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
