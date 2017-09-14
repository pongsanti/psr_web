import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption, postOption,
  fetchPromise } from './helper';

export const user_get = createAction('USER_GET');
export const user_recv = createAction('USER_RECV');
export const user_fail = createAction('USER_FAIL');

export const user_header_click = createAction('USER_HEADER_CLICK');

export const user_post = createAction('USER_POST');
export const user_post_recv = createAction('USER_POST_RECV');

export const user_del = createAction('USER_DEL');
export const user_del_recv = createAction('USER_DEL_RECV');

const userGetUrl = (sortObj) => {
  const {field, direction} = sortObj
  return `${config.URL}/api/users?order=${field}&direction=${direction}`
}

export const userGet = () => {
  return (dispatch, getState) => {
    const {login, user} = getState();

    dispatch(user_get());
    Noti.notiLoading();

    return fetchPromise(userGetUrl(user.sort), fetchOption(fetchHeader(login.token), 'GET'))
    .then(json => {
      dispatch(user_recv(json))
      Noti.notiClear();
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_fail(err_text));
      Noti.notiClear();
      Noti.notiError(err_text);
      return error;
    });
  }
}

export const userPost = (postData) => {
  return (dispatch, getState) => {
    const {login} = getState();

    dispatch(user_post());
    Noti.notiLoading();

    return fetchPromise(`${config.URL}/api/users`, postOption(fetchHeader(login.token), JSON.stringify(postData)))
    .then(json => {
      dispatch(user_post_recv(json))
      Noti.notiClear();
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_fail(err_text));
      Noti.notiClear();
      Noti.notiError(err_text);
      return error;
    });
  }
}

export const userDelete = (id) => {
  return (dispatch, getState) => {
    const {login} = getState();

    dispatch(user_del());
    Noti.notiLoading();

    return fetchPromise(`${config.URL}/api/users/${id}`, fetchOption(fetchHeader(login.token), 'DELETE'))
    .then(json => {
      dispatch(user_del_recv())
      Noti.notiClear();
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_fail(err_text));
      Noti.notiClear();
      Noti.notiError(err_text);
      return error;
    })
  }
}