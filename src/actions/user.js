import { createAction } from 'redux-actions';
import { noti_push } from './noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption, postOption,
  fetchResponseResolve,
  fetchResponseReject} from './helper';

export const user_get = createAction('USER_GET');
export const user_recv = createAction('USER_RECV');
export const user_fail = createAction('USER_FAIL');

export const userGet = () => {
  return (dispatch, getState) => {
    const {login} = getState();

    dispatch(user_get());

    return fetch(`${config.URL}/api/users`, fetchOption(fetchHeader(login.token), 'GET'))
    .then(fetchResponseResolve, fetchResponseReject)
    .then(json => {
      dispatch(user_recv(json))
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_fail(err_text));
      dispatch(noti_push({message: err_text, level: 'error', title: 'Sorry - Something went wrong.'}));
      return error;
    });
  }
}