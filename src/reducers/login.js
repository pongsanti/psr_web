import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  email: '',
  token: null,
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
    error: null
  }),
  [ActionTypes.login_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  })
}, defaultState);

export default reducer;
