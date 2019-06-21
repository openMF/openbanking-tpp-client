import users from '../../config/users';
import {clearPaymentRequest} from "../payment/actions.js";
import {clearQrData} from "../qr/actions.js";
import {loginCompleted, loginFailed, loginStarted, logoutUser} from "./actions";

export const login = (username, history) => (dispatch, getState) => {
    dispatch(loginStarted());
    const {bank} = getState();
    const registeredUser = users.find(user => {
        // const allowedBank = user.banks.find(userBank => userBank.bankName === bank) ? true : false;
        return user.username === username;
    });
    if (registeredUser) {
        dispatch(loginCompleted(registeredUser));
        history.push(`/`);
    } else {
        dispatch(loginFailed());
    }
};

export const logout = (history) => dispatch => {
    dispatch(logoutUser());
    dispatch(clearPaymentRequest());
    dispatch(clearQrData());
    history.push(`/`);
};
