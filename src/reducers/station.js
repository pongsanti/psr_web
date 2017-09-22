import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  stations: [],
  error: null,
}

const reducer = handleActions({
  [ActionTypes.station_get]: (state, action) => ({
    ...state,
    isFetching: true,
    error: null
  }),
  [ActionTypes.station_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    stations: action.payload.stations,
    error: null
  }),
  [ActionTypes.station_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),
}, defaultState);

export default reducer;
