import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, postOption, fetchPromise } from './helper';

export const change_pass_post = createAction('CHNG_PASS_POST');
export const change_pass_post_recv = createAction('CHNG_PASS_POST_RECV');
export const change_pass_post_fail = createAction('CHNG_PASS_POST_FAIL');

export const changePasswordPost = (postData) => {
  return (dispatch, getState) => {
    const {login} = getState();

    dispatch(change_pass_post());
    Noti.notiLoading();

    return fetchPromise(`${config.URL}/api/change_password`, postOption(fetchHeader(login.token), JSON.stringify(postData)))
    .then(json => {
      dispatch(change_pass_post_recv(json))
      Noti.notiClear();
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(change_pass_post_fail(err_text));
      Noti.notiClear();
      Noti.notiError(err_text);
      return Promise.reject(error);
    });
  }
}
