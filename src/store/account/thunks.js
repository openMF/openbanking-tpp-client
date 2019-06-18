import axios from "axios";
import {
  GetAccountsRequested,
  GetAccountsSucceeded,
  GetAccountsFailed,
  GetAccountRequested,
  GetAccountSucceeded,
  GetAccountFailed
} from "./actions";
import { API_URL } from "../../config/server";

const baseUrl = `${API_URL}/aisp/v1`;

export const getAccounts = () => dispatch => {
  dispatch(GetAccountsRequested());

  axios
    .get(`${baseUrl}/accounts`)
    .then(res => {
      dispatch(GetAccountsSucceeded(res.data.account));
    })
    .catch(error => dispatch(GetAccountsFailed(error)));
};

export const getAccount = accountId => dispatch => {
  dispatch(GetAccountRequested());

  axios
    .get(`${baseUrl}/accounts/${accountId}`)
    .then(res => {
      dispatch(GetAccountSucceeded(res.data.account));
    })
    .catch(error => dispatch(GetAccountFailed(error)));
};
