import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'configureStore';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';

// import reducers from 'reducers';
import Main from 'Main';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.querySelector('.container'));
