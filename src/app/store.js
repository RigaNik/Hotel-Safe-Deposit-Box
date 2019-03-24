import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// todo, comeback to refactor reduxdevtools for dev only based on env const
export default (initialState = {}) => {
  const middlewares = [thunk];
  let middleware = applyMiddleware(...middlewares);

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  return createStore(rootReducer(), initialState, composeEnhancers(middleware));
};
