import { createAction } from 'redux-actions';
import Noti from '../layouts/noti'
import { extract_string } from '../helpers/error';
import config from '../config'
import { fetchHeader, fetchOption, postOption} from './helper';
import * as st_storage from '../layouts/storage';

export const login_post = createAction('LOGIN_POST');
export const login_recv = createAction('LOGIN_RECV');
export const login_fail = createAction('LOGIN_FAIL');

export const logout_delete = createAction('LOGOUT_DELETE');
export const logout_recv = createAction('LOGOUT_RECV');

const fetchResponseResolve = (response) => {
  const json = response.json();
    if(response.ok) {
      return json;
    } else {
      return json.then(resolve => Promise.reject(resolve));
    }
}

const fetchResponseReject = (error) => {
  console.log('An error occured.', error);
  return Promise.reject(error);  
}

export const loginPost = (loginData) => {
  return (dispatch) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(login_post())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    const fetchOpt = postOption(fetchHeader(), JSON.stringify(loginData));
    return fetch(`${config.URL}/login`, fetchOpt)
      .then(fetchResponseResolve
        ,
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        fetchResponseReject
      )
      .then(json => {
          // We can dispatch many times!
          // Here, we update the app state with the results of the API call.
          dispatch(login_recv(json));          
          // put flag in storage
          st_storage.userLogIn();
          return json;
        },
        error => {
          const err_text = extract_string(error);
          dispatch(login_fail(err_text));
          Noti.notiError(err_text);
          return error;
        }
      )   
  }
}

export const logoutDelete = () => {
  return (dispatch, getState) => {
    const {login} = getState();

    dispatch(logout_delete());

    return fetch(`${config.URL}/api/sessions`, fetchOption(fetchHeader(login.token), 'DELETE'))
    .then(fetchResponseResolve, fetchResponseReject)
    .then(json => {
      dispatch(logout_recv(json))
      // remove flag in the storage
      st_storage.userLogout();
      return json;
    }, error => {
      const err_text = extract_string(error);
      // remove flag in the storage
      st_storage.userLogout();
      Noti.notiError(err_text);
      return error;
    });
  }
}
