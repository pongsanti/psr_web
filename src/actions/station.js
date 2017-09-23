import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption,
  fetchPromise } from './helper';
  import { noti_add, noti_clear } from './noti';  

export const station_get = createAction('STATION_GET');
export const station_recv = createAction('STATION_RECV');
export const station_fail = createAction('STATION_FAIL');

export const stationGet = () => {
  return (dispatch, getState) => {
    const {login} = getState();

    dispatch(station_get());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/stations`, fetchOption(fetchHeader(login.token), 'GET'))
    .then(json => {
      dispatch(station_recv(json))
      dispatch(noti_clear());
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(station_fail(err_text));
      dispatch(noti_clear());
      dispatch(noti_add(Noti.notiError(err_text)));
      return error;
    });
  }
}
