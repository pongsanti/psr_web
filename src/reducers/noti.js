import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  showNoti: false,
  message: ''
}

const reducer = handleActions({
  [ActionTypes.noti_push]: (state, action) => ({
    ...state,
    showNoti: true,
    message: action.payload
  }),
  [ActionTypes.noti_clear]: (state, action) => ({
    ...defaultState
  })
}, defaultState);

export default reducer;