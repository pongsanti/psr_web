import { handleAction } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  email: ''
}

const reducer = handleAction(ActionTypes.login_post, (state, action) => ({

}), defaultState);

export default reducer;
