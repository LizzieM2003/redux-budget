import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from 'reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

export var configureStoreWithState = (initialState = {}) => {
  return createStoreWithMiddleware(reducers, initialState);
  // return storeWithInitialState;
};

export default store;
