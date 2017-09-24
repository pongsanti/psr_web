import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  trucks: [],
  error: null,
}

const reducer = handleActions({
  [ActionTypes.truck_get]: (state, action) => ({
    ...state,
    isFetching: true,
    error: null
  }),
  [ActionTypes.truck_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    trucks: action.payload.trucks,
    error: null
  }),
  [ActionTypes.truck_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),
}, defaultState);

export default reducer;
