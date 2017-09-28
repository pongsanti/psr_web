import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption, postOption, deleteOption,
  fetchPromise } from './helper';
import { noti_add, noti_clear } from './noti';  

export const user_truck_get = createAction('USER_TRUCK_GET');
export const user_truck_recv = createAction('USER_TRUCK_RECV');
export const user_truck_fail = createAction('USER_TRUCK_FAIL');

export const user_truck_post = createAction('USER_TRUCK_POST');

export const user_truck_del = createAction('USER_TRUCK_DEL');
export const user_truck_del_recv = createAction('USER_TRUCK_DEL_RECV');

export const userTruckGet = () => {
  return (dispatch, getState) => {
    const {login, user} = getState();
    const user_id = user.curUser.id

    dispatch(user_truck_get());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/user_trucks/${user_id}`, fetchOption(fetchHeader(login.token), 'GET'))
    .then(json => {
      dispatch(user_truck_recv(json))
      dispatch(noti_clear());
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_truck_fail(err_text));
      dispatch(noti_clear());
      dispatch(noti_add(Noti.notiError(err_text)));
      return error;
    });
  }
}

export const userTruckPost = (postData) => {
  return (dispatch, getState) => {
    const {login, user} = getState();
    const user_id = user.curUser.id

    dispatch(user_truck_post());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/user_trucks/${user_id}`, postOption(fetchHeader(login.token), JSON.stringify(postData)))
    .then(json => {
      dispatch(user_truck_recv(json))
      dispatch(noti_clear());
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_truck_fail(err_text));
      dispatch(noti_clear());
      dispatch(noti_add(Noti.notiError(err_text)));
      return error;
    });
  }
}

const fetchErrorMessageHandler = (dispatch, action, error) => {
  const err_text = extract_string(error);
  dispatch(action(err_text));
  dispatch(noti_clear());
  dispatch(noti_add(Noti.notiError(err_text)));
  return Promise.reject(error);
}

export const userTruckDelete = (user_truck_id) => {
  return (dispatch, getState) => {
    const {login} = getState();
    
    dispatch(user_truck_del());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/user_trucks/${user_truck_id}`, deleteOption(fetchHeader(login.token)))
    .then(json => {
      dispatch(user_truck_del_recv(json))
      dispatch(noti_clear());
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, user_truck_fail)
    );
  }
}
