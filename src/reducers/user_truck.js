import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  trucks: [],
  error: null
}

const handleFetch = (state, action) => ({
  ...state,
  isFetching: true,
  error: null  
})

const reducer = handleActions({
  [ActionTypes.user_truck_get]: handleFetch,
  [ActionTypes.user_truck_post]: handleFetch,
  [ActionTypes.user_truck_del]: handleFetch,
  [ActionTypes.user_truck_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    trucks: action.payload.trucks,
    error: null
  }),
  [ActionTypes.user_truck_del_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    error: null
  }),  
  [ActionTypes.user_truck_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),
}, defaultState);

export default reducer;
