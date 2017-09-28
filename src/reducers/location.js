import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  locations: [],
  error: null,
}

const handleFetch = (state, action) => ({
  ...state,
  isFetching: true,
  error: null,
})

const reducer = handleActions({
  [ActionTypes.location_get]: handleFetch,
  [ActionTypes.location_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    locations: action.payload.locations,
    error: null
  }),
  [ActionTypes.location_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),
}, defaultState);

export default reducer;
