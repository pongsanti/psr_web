import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption,
  fetchPromise } from './helper';
  import { noti_add, noti_clear } from './noti';  

export const truck_get = createAction('TRUCK_GET');
export const truck_recv = createAction('TRUCK_RECV');
export const truck_fail = createAction('TRUCK_FAIL');

export const truckGet = () => {
  return (dispatch, getState) => {
    const {login} = getState();

    dispatch(truck_get());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/trucks`, fetchOption(fetchHeader(login.token), 'GET'))
    .then(json => {
      dispatch(truck_recv(json))
      dispatch(noti_clear());
      return json;
    }, error => {
      const err_text = extract_string(error);
      dispatch(truck_fail(err_text));
      dispatch(noti_clear());
      dispatch(noti_add(Noti.notiError(err_text)));
      return error;
    });
  }
}
