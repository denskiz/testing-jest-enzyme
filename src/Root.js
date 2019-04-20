import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

// when we import a directory by default we get the index.js file
import reducers from 'reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// default state to be an empty object
export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(reduxPromise))
  );
  return <Provider store={store}>{children}</Provider>;
};
