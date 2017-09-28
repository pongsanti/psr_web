import { noti_add, noti_clear } from './noti';
import Noti from '../layouts/noti';
import { extract_string } from '../helpers/error';

const fetchErrorMessageHandler = (dispatch, action, error) => {
  const err_text = extract_string(error);
  dispatch(action(err_text));
  dispatch(noti_clear());
  dispatch(noti_add(Noti.notiError(err_text)));
  return Promise.reject(error);
}

export default fetchErrorMessageHandler;
