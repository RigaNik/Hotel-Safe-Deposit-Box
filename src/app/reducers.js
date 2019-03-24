import { combineReducers } from 'redux';
import { depositBoxReducer } from '../redux/deposit-box/reducer';

const rootReducer = () =>
  combineReducers({
    depositBox: depositBoxReducer,
  });

export default rootReducer;
