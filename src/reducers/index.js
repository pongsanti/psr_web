import { combineReducers } from 'redux';
import login from './login';
import noti from './noti';
import user from './user';

const rootReducer = combineReducers({
  login,
  noti,
  user
});

export default rootReducer;
