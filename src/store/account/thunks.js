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
import toCamel from "../../utils/toCamelHelper";

const baseUrl = `${API_URL}/aisp/v1`;

const getAccountData = async (bankId, dispatch, getState) => {
  return Promise.all([
    axios.get(`${baseUrl}/accounts`, { headers: { "x-tpp-bankid": bankId } }),
    axios.get(`${baseUrl}/balances`, { headers: { "x-tpp-bankid": bankId } })
  ])
    .then(responses => {
      const accounts = toCamel(responses[0].data).data.account;
      const balances = toCamel(responses[1].data).data.balance;
      const extendedAccounts = accounts.map(account => {
        const balance = balances.find(b => b.accountId === account.accountId);
        return { ...account, balance, bankId };
      });
      const allAccounts = getState().accounts.accounts.concat(extendedAccounts);
      dispatch(getAccountsSucceeded(allAccounts));
    })
    .catch(error => {
      if (error.response.status === 428) {
        throw error.response;
      }
      dispatch(getAccountsFailed(error));
    });
};

export const getConsentIdForBankRegistration = async bankId => {
  try {
    await getAccountData(bankId);
  } catch (error) {
    return error.headers["x-tpp-consentid"];
  }
};

export const getAccounts = bankIds => (dispatch, getState) => {
  dispatch(getAccountsRequested());
  for (const bankId of bankIds) {
    getAccountData(bankId, dispatch, getState);
  }
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
      dispatch(getAccountSucceeded({ ...account, balance }));
    })
    .catch(error => dispatch(getAccountFailed(error)));
};
