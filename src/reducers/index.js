import { combineReducers } from 'redux';
import noti from './noti';
import login from './login';
import user from './user';
import change_password from './change_password';
import station from './station';
import user_station from './user_station';
import truck from './truck';
import user_truck from './user_truck';
import location from './location';

const rootReducer = combineReducers({
  noti,
  login,
  user,
  change_password,
  station,
  user_station,
  truck,
  user_truck,
  location,
});

export default rootReducer;
