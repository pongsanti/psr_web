import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  isFetching: false,
  email: '',
  user: null
}

const reducer = handleActions({
  [ActionTypes.login_post]: (state, action) => ({
    ...state,
    isFetching: true,
    email: action.payload.email || ''
  }),
  [ActionTypes.login_recv]: (state, action) => ({
    ...state,
    isFetching: true,
  })
}, defaultState);

export default reducer;
