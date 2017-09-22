import { combineReducers } from 'redux';
import login from './login';
import user from './user';
import change_password from './change_password';
import station from './station';

const rootReducer = combineReducers({
  login,
  user,
  change_password,
  station,
});

export default rootReducer;
