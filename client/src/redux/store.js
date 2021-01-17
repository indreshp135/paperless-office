import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer.js';
import {loadState,saveState} from './sessionStorage';

const middleWare = [thunk];
const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middleWare))
);
store.subscribe(() => {
  saveState(
   store.getState()
  );
});
export default store;