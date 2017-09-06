import { combineReducers } from 'redux';
import login from './login';
import noti from './noti';

const rootReducer = combineReducers({
  login,
  noti
});

export default rootReducer;
