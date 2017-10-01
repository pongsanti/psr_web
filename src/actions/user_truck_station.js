import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption, postOption, deleteOption,
  fetchPromise } from './helper';
import { noti_add, noti_clear } from './noti';  

export const uts_get = createAction('UTS_GET');
export const uts_recv = createAction('UTS_RECV');
export const uts_fail = createAction('UTS_FAIL');

export const userTruckStationGet = (user_truck_id) => {
  return (dispatch, getState) => {
    const {login} = getState();
    
    dispatch(uts_get());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/user_truck_stations/user_truck/${user_truck_id}`, fetchOption(fetchHeader(login.token), 'GET'))
    .then(json => {
      dispatch(uts_recv(json))
      dispatch(noti_clear());
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(uts_fail(err_text));
      dispatch(noti_clear());
      dispatch(noti_add(Noti.notiError(err_text)));
      return error;
    });
  }
}
