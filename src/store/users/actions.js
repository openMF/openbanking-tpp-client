export const SELECT_USER = 'ADD_USERS';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const LOGOUT = 'LOGOUT';
export const INIT_APP = 'INIT_APP';

export const initApp = () => ({
    type: INIT_APP
});

export const selectUser = (user) => ({
    type: SELECT_USER, payload: user
});

export const loginStarted = () => ({
    type: LOGIN_STARTED,
});

export const loginFailed = () => ({
    type: LOGIN_FAILED
});

export const loginCompleted = (user) => ({
    type: LOGIN_COMPLETED, payload: {user}
});

export const logoutUser = () => ({type: LOGOUT, payload:{}});
