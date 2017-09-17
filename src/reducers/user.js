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
  curUser: null,
  error: null,
}

const handleFetchStart = (state, action) => ({
  ...state,
  isFetching: true,
  error: null
})

const handleFetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  error: null
})

const reducer = handleActions({
  [ActionTypes.user_edit]: (state, action) => ({
    ...state,
    curUser: action.payload,
  }),
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
  [ActionTypes.user_post_recv]: handleFetchSuccess,
  [ActionTypes.user_del]: handleFetchStart,
  [ActionTypes.user_del_recv]: handleFetchSuccess,
  [ActionTypes.user_patch]: handleFetchStart,
  [ActionTypes.user_patch_recv]: (state, action) => ({
    ...handleFetchSuccess(state, action),
    curUser: defaultState.curUser,
  }),  
}, defaultState);

export default reducer;
