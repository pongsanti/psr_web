import { createAction } from 'redux-actions';

export const login_post = createAction('LOGIN_POST', loginData => loginData);
export const login_recv = createAction('LOGIN_RECV', json => json);
export const login_fail = createAction('LOGIN_FAIL', json => json);

export const loginPost = (loginData) => {
  return (dispatch) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(login_post(loginData))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch('http://localhost:4567/psr/login')
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occured.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(login_recv(json))
      )
  }
}
