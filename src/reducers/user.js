import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  users: [],
  pager: {},
  error: null,
}

const reducer = handleActions({
  [ActionTypes.user_get]: (state, action) => ({
    ...state,
    isFetching: true,
    error: null
  }),
  [ActionTypes.user_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    users: action.payload.users,
    pager: action.payload.pager,
    error: null
  }),
  [ActionTypes.user_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),
  [ActionTypes.user_post]: (state, action) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [ActionTypes.user_post_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    error: null
  })  
}, defaultState);

export default reducer;
