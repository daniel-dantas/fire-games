import { createStore, applyMiddleware, compose } from 'redux';

import Thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import persistReducers from './persistReducers';

import reducers from './reducers';

const middleware = [Thunk];

const store = createStore(
  persistReducers(reducers),
  compose(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
