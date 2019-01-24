import users from '../../config/users';
import {loginCompleted, loginFailed, loginStarted} from "./actions";

export const login = username => dispatch => {
    dispatch(loginStarted());
    const registeredUser = users.find( user => user.username === username);
    if (registeredUser) {
        dispatch(loginCompleted(registeredUser));
    } else {
        dispatch(loginFailed());
    }
};