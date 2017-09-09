import {noti_clear} from '../actions';

const _addNotification = (that, notiObj) => {
  that._notificationSystem.addNotification({
    title: notiObj.title,
    message: notiObj.message,
    level: notiObj.level,
    position: 'tc',
  });
  that.props.dispatch(noti_clear());
}

export default _addNotification;
