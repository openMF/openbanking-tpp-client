import axios from "axios";
import {
  getAccountsRequested,
  getAccountsSucceeded,
  getAccountsFailed,
  getAccountRequested,
  getAccountSucceeded,
  getAccountFailed
} from "./actions";
import { API_URL } from "../../config/server";
import toCamel from '../../utils/toCamelHelper';

const baseUrl = `${API_URL}/aisp/v1`;

export const getAccounts = () => dispatch => {
  dispatch(getAccountsRequested());

  Promise.all([
    axios.get(`${baseUrl}/accounts`),
    axios.get(`${baseUrl}/balances`)
  ])
    .then(responses => {
      const accounts = toCamel(responses[0].data).data.account;
      const balances = toCamel(responses[1].data).data.balance;
      const extendedAccounts = accounts.map(account => {
        const balance = balances.find(b=>b.accountId === account.accountId);
        return {...account, balance};
      })
      dispatch(getAccountsSucceeded(extendedAccounts));
    })
    .catch(error => dispatch(getAccountsFailed(error)));
};

export const getAccount = accountId => dispatch => {
  dispatch(getAccountRequested());

  Promise.all([
    axios.get(`${baseUrl}/accounts/${accountId}`),
    axios.get(`${baseUrl}/accounts/${accountId}/balances`)
  ])
    .then(responses => {
      const account = toCamel(responses[0].data).data.account[0];
      const balance = toCamel(responses[1].data).data.balance[0];
      dispatch(getAccountSucceeded({...account, balance}));
    })
    .catch(error => dispatch(getAccountFailed(error)));
};
