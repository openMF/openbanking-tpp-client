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

  Promise.all([
    axios.get(`${baseUrl}/accounts`),
    axios.get(`${baseUrl}/balances`)
  ])
    .then(responses => {
      const accounts = responses[0].data.data.account;
      const balances = responses[1].data.data.balance;
      const extendedAccounts = accounts.map(account => {
        const balance = balances.find(b=>b.accountId === account.accountId);
        return {...account, balance};
      })
      dispatch(GetAccountsSucceeded(extendedAccounts));
    })
    .catch(error => dispatch(GetAccountsFailed(error)));
};

export const getAccount = accountId => dispatch => {
  dispatch(GetAccountRequested());

  Promise.all([
    axios.get(`${baseUrl}/accounts/${accountId}`),
    axios.get(`${baseUrl}/accounts/${accountId}/balances`)
  ])
    .then(responses => {
      const account = responses[0].data.data.account[0];
      const balance = responses[1].data.data.balance[0];
      dispatch(GetAccountSucceeded({...account, balance}));
    })
    .catch(error => dispatch(GetAccountFailed(error)));
};
