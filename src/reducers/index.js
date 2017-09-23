import { combineReducers } from 'redux';
import noti from './noti';
import login from './login';
import user from './user';
import change_password from './change_password';
import station from './station';
import user_station from './user_station';

const rootReducer = combineReducers({
  noti,
  login,
  user,
  change_password,
  station,
  user_station,
});

export default rootReducer;
