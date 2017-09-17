import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  error: null,
}

const reducer = handleActions({
  [ActionTypes.change_pass_post]: (state, action) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [ActionTypes.change_pass_post_recv]: (state, action) => ({
    ...state,
    isFetching: false,
    error: null,
  }),
  [ActionTypes.change_pass_post_fail]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, defaultState);

export default reducer;
