import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  sort: {
    field: 'id',
    direction: 'asc'
  },
  users: [],
  pager: {},
  error: null,
}

const handleFetchStart = (state, action) => ({
  ...state,
  isFetching: true,
  error: null
})

const reducer = handleActions({
  [ActionTypes.user_header_click]: (state, action) => ({
    ...state,
    sort: action.payload
  }),
  [ActionTypes.user_get]: handleFetchStart,
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
  [ActionTypes.user_post]: handleFetchStart,
  [ActionTypes.user_post_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    error: null
  }),
  [ActionTypes.user_del]: handleFetchStart,
  [ActionTypes.user_del_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    error: null
  }),
}, defaultState);

export default reducer;
