import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import config from '../config'
import { fetchHeader, fetchOption, postOption, deleteOption,
  fetchPromise } from './helper';
import { noti_add, noti_clear } from './noti';
import fetchErrorMessageHandler from './common'

export const location_get = createAction('LOCATION_GET');
export const location_recv = createAction('LOCATION_RECV');
export const location_fail = createAction('LOCATION_FAIL');

export const locationGet = () => {
  return (dispatch, getState) => {
    const {login} = getState();
    
    dispatch(location_get());
    dispatch(noti_add(Noti.notiLoading()));

    return fetchPromise(`${config.URL}/api/locations`, fetchOption(fetchHeader(login.token), 'GET'))
    .then(json => {
      dispatch(location_recv(json))
      dispatch(noti_clear());
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, location_fail)
    );
  }
}