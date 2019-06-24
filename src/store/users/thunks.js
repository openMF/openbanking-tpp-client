import axios from "axios";
import { clearPaymentRequest } from "../payment/actions.js";
import { clearQrData } from "../qr/actions.js";
import {
  loginCompleted,
  loginFailed,
  loginStarted,
  logoutUser
} from "./actions";
import { API_URL } from "../../config/server";

export const tryLogin = history => dispatch => {
  const credentials = localStorage.getItem("cred");
  if (credentials) {
    dispatch(
      loginCompleted({
        username: credentials.username,
        firstName: "John",
        lastName: "Smith",
        role: "customer"
      })
    );
    history.push(`/`);
  }
};

export const login = (credentials, history) => dispatch => {
  dispatch(loginStarted());
  localStorage.setItem("cred", credentials);
  axios
    .get(`${API_URL}/user/v1/banks`)
    .then(() => {
      dispatch(
        loginCompleted({
          username: credentials.username,
          firstName: "John",
          lastName: "Smith",
          role: "customer"
        })
      );
      history.push(`/`);
    })
    .catch(() => dispatch(loginFailed()));
};

export const logout = history => dispatch => {
  localStorage.removeItem("cred");
  dispatch(logoutUser());
  dispatch(clearPaymentRequest());
  dispatch(clearQrData());
  history.push(`/`);
};
