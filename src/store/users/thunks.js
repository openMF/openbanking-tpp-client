import axios from "axios";
import { clearPaymentRequest } from "../payment/actions.js";
import { clearQrData } from "../qr/actions.js";
import {
  loginCompleted,
  loginFailed,
  loginStarted,
  logoutUser,
  initApp
} from "./actions";
import { API_URL } from "../../config/server";

export const tryLogin = () => dispatch => {
  dispatch(initApp());
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
  }
};

export const login = (credentials, history) => dispatch => {
  dispatch(loginStarted());
  axios
    .get(`${API_URL}/user/v1/banks`)
    .then(() => {
      localStorage.setItem("cred", credentials);
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
