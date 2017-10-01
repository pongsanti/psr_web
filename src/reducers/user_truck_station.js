import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  uts: [],
  error: null
}

const handleFetch = (state, action) => ({
  ...state,
  isFetching: true,
  error: null  
})

const reducer = handleActions({
  [ActionTypes.uts_get]: handleFetch,
  [ActionTypes.uts_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    uts: action.payload.uts,
    error: null
  }),
  [ActionTypes.uts_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),
}, defaultState);

export default reducer;
