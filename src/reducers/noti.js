import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  showNoti: false,
  notiObj: ''
}

const reducer = handleActions({
  [ActionTypes.noti_push]: (state, action) => ({
    ...state,
    showNoti: true,
    notiObj: action.payload
  }),
  [ActionTypes.noti_clear]: (state, action) => ({
    ...defaultState
  })
}, defaultState);

export default reducer;