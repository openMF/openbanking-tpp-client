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
import { openBankAuthUrl } from "../../utils/externalUrlHelper";

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
      if (dispatch && getState) {
        const allAccounts = getState().accounts.accounts.concat(
          extendedAccounts
        );
        dispatch(getAccountsSucceeded(allAccounts));
      }
    })
    .catch(error => {
      if (error.response.status === 428) {
        const newError = error.response;
        newError.bankId = bankId;
        throw newError;
      }
      dispatch(getAccountsFailed(error.response));
    });
};

export const getConsentIdForBankRegistration = async bankId => {
  try {
    await getAccountData(bankId);
    return null;
  } catch (error) {
    return error.headers["x-tpp-consentid"];
  }
};

export const getAccounts = banks => (dispatch, getState) => {
  dispatch(getAccountsRequested());
  for (let bank of banks) {
    getAccountData(bank.bankId, dispatch, getState).catch(error => {
      const consentId = error.headers["x-tpp-consentid"];
      openBankAuthUrl(bank, consentId);
    });
  }
};

export const getAccount = (accountId, bankId) => dispatch => {
  dispatch(getAccountRequested());

  Promise.all([
    axios.get(`${baseUrl}/accounts/${accountId}`, {
      headers: { "x-tpp-bankid": bankId }
    }),
    axios.get(`${baseUrl}/accounts/${accountId}/balances`, {
      headers: { "x-tpp-bankid": bankId }
    })
  ])
    .then(responses => {
      const account = toCamel(responses[0].data).data.account[0];
      const balance = toCamel(responses[1].data).data.balance[0];
      dispatch(getAccountSucceeded({ ...account, balance }));
    })
    .catch(error => dispatch(getAccountFailed(error.response)));
};
