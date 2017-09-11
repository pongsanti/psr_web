const ERROR_TITLE = 'Sorry - Something went wrong.';
const LOADING_TITLE = 'Loading...';
const LOADING_MSG = 'please wait';

const notiObj = (title, message, level) => ({
  title,
  message,
  level,
  position: 'tc'
})

const notiError = (message) => {
  st_noti.addNotification(notiObj(ERROR_TITLE, message, 'error'));
}

const notiLoading = () => {
  let notiOpts = notiObj(LOADING_TITLE, LOADING_MSG, 'info');
  notiOpts = {
    ...notiOpts,
    autoDismiss: false
  }
  st_noti.addNotification(notiOpts);
}

const notiClear = () => { st_noti.clearNotifications(); }

export default {notiError, notiLoading, notiClear};
