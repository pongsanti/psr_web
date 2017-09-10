export const LOGGED_IN = 'st_logged_in';

global.st_storage = window.localStorage;

export const isLoggedIn = () => global.st_storage.getItem(LOGGED_IN)
export const userLogIn = () => global.st_storage.setItem(LOGGED_IN, true)
export const userLogout = () => global.st_storage.removeItem(LOGGED_IN)
