import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  email: '',
  token: null,
  user: null,
  error: null
}

const reducer = handleActions({
  [ActionTypes.login_post]: (state, action) => ({
    ...state,
    isFetching: true,
    email: action.payload.email || '',
    error: null
  }),
  [ActionTypes.login_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    token: action.payload.token,
    user: action.payload.user,
    error: null
  }),
  [ActionTypes.login_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),
  [ActionTypes.logout_delete]: (state, action) => ({
    ...state,
    isFetching: true
  }),
  [ActionTypes.logout_recv]: (state, action) => ({
    ...defaultState
  })   
}, defaultState);

export default reducer;
