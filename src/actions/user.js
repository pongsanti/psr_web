import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption, postOption,
  patchOption,
  fetchPromise } from './helper';

export const user_get = createAction('USER_GET');
export const user_recv = createAction('USER_RECV');
export const user_fail = createAction('USER_FAIL');

export const user_header_click = createAction('USER_HEADER_CLICK');
export const user_page_change = createAction('USER_PAGE_CHNG');
export const user_page_size_change = createAction('USER_PAGE_SIZE_CHNG');

export const user_new = createAction('USER_NEW');
export const user_post = createAction('USER_POST');
export const user_post_recv = createAction('USER_POST_RECV');

export const user_del = createAction('USER_DEL');
export const user_del_recv = createAction('USER_DEL_RECV');

export const user_edit = createAction('USER_EDIT');
export const user_patch = createAction('USER_PATCH');
export const user_patch_recv = createAction('USER_PATCH_RECV');

const userGetUrl = (sortObj, pageObj) => {
  const {field, direction} = sortObj;
  const {page, size} = pageObj;
  return `${config.URL}/api/users?order=${field}&direction=${direction}&page=${page}&size=${size}`;
}

export const userGet = () => {
  return (dispatch, getState) => {
    const {login, user} = getState();

    dispatch(user_get());
    Noti.notiLoading();

    return fetchPromise(userGetUrl(user.sort, user.page), fetchOption(fetchHeader(login.token), 'GET'))
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
      return Promise.reject(error);
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

export const userPatch = (patchData) => {
  return (dispatch, getState) => {
    const {login, user} = getState();
    const id = user.curUser.id

    dispatch(user_patch());
    Noti.notiLoading();

    return fetchPromise(`${config.URL}/api/users/${id}`, patchOption(fetchHeader(login.token), JSON.stringify(patchData)))
    .then(json => {
      dispatch(user_patch_recv())
      Noti.notiClear();
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_fail(err_text));
      Noti.notiClear();
      Noti.notiError(err_text);
      return Promise.reject(error);
    })
  }
}
