import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
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
    Noti.notiLoading();

    return fetch(`${config.URL}/api/users`, fetchOption(fetchHeader(login.token), 'GET'))
    .then(fetchResponseResolve, fetchResponseReject)
    .then(json => {
      dispatch(user_recv(json))
      Noti.notiClear();
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_fail(err_text));
      Noti.notiError(err_text);
      return error;
    });
  }
}