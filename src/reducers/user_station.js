import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  stations: [],
  error: null
}

const handleFetch = (state, action) => ({
  ...state,
  isFetching: true,
  error: null  
})

const reducer = handleActions({
  [ActionTypes.user_station_get]: handleFetch,
  [ActionTypes.user_station_patch]: handleFetch,  
  [ActionTypes.user_station_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    stations: action.payload.stations,
    error: null
  }),
  [ActionTypes.user_station_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),
}, defaultState);

export default reducer;
