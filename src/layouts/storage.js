export const TOKEN = 'ST_TOKEN';

global.st_storage = window.sessionStorage;

export const isLoggedIn = () => global.st_storage.getItem(TOKEN) != null
export const userLogIn = (token) => global.st_storage.setItem(TOKEN, token)
export const userLogout = () => global.st_storage.removeItem(TOKEN)
