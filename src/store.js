import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import getRootReducer from './reducers';

export default function getStore(navReducer) {
  const store = createStore(
      getRootReducer(navReducer),
      undefined,
      applyMiddleware(ReduxThunk)
  );

  return store;
}
