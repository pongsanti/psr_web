import { createAction } from 'redux-actions';

export const login_post = createAction('LOGIN_POST');
export const login_recv = createAction('LOGIN_RECV');
export const login_fail = createAction('LOGIN_FAIL');

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const myInit = {
  method: 'POST',
  headers: myHeaders };

export const loginPost = (loginData) => {
  return (dispatch) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    const dispatch_result = dispatch(login_post(loginData))
    console.log(typeof dispatch_result);
    console.log(dispatch_result);

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    const fetchInit = {
      ...myInit,
      body: JSON.stringify(loginData)
    }
    return fetch('http://localhost:4567/psr/login', fetchInit)
      .then(
        response => {
          const json = response.json();
          console.log(typeof json);
          console.log(json);
          console.log(json.value)
          if(response.ok) {
            return json
          } else {
            throw json;
          }
        }
        ,
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          console.log('An error occured.', error);
          return dispatch(login_fail(error));
        }
      )
      .then(json => {
        console.log(json)
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        if (!isErrorObj(json)) {    
          return dispatch(login_recv(json));
        }       
      },
      error => {
        console.log('error in rejected')
        console.log(typeof error)
        console.log(error)
        //return dispatch(login_fail(error))
        return error;
      }
      
      ).then(resolve => {
        console.log('third then')
        console.log(typeof resolve)
        console.log(resolve)
        dispatch(login_fail(resolve));
      })
      
      // .catch(error => {
      //   console.log('fail in catch')
      //   console.log(typeof error)
      //   console.log(error)
      //   return dispatch(login_fail(error))
      // })
  }
}

const isErrorObj = obj => obj.hasOwnProperty('error');
