import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption, patchOption,
  fetchPromise } from './helper';
  import { noti_add, noti_clear } from './noti';  

export const user_station_get = createAction('USER_STATION_GET');
export const user_station_recv = createAction('USER_STATION_RECV');
export const user_station_fail = createAction('USER_STATION_FAIL');

export const user_station_patch = createAction('USER_STATION_PATCH');

export const user_station_reset = createAction('USER_STATION_RESET');

export const userStationGet = () => {
  return (dispatch, getState) => {
    const {login, user} = getState();
    const user_id = user.curUser.id

    dispatch(user_station_get());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/user_stations/${user_id}`, fetchOption(fetchHeader(login.token), 'GET'))
    .then(json => {
      dispatch(user_station_recv(json))
      dispatch(noti_clear());
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_station_fail(err_text));
      dispatch(noti_clear());
      dispatch(noti_add(Noti.notiError(err_text)));
      return error;
    });
  }
}

export const userStationPatch = (payload) => {
  return (dispatch, getState) => {
    const {login, user} = getState();
    const user_id = user.curUser.id

    dispatch(user_station_patch());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/user_stations/${user_id}`,
      patchOption(fetchHeader(login.token), JSON.stringify(payload)))
    .then(json => {
      dispatch(user_station_recv(json))
      dispatch(noti_clear());
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(user_station_fail(err_text));
      dispatch(noti_clear());
      dispatch(noti_add(Noti.notiError(err_text)));
      return error;
    });
  }
}
