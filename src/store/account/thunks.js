import axios from "axios";
import {
    getAccountsRequested,
    getAccountsSucceeded,
    getAccountsFailed,
    getAccountRequested,
    getAccountSucceeded,
    getAccountFailed, getTransactionsRequested, getTransactionsSucceeded, getTransactionsFailed
} from "./actions";
import {API_URL} from "../../config/server";
import toCamel from "../../utils/toCamelHelper";
import {openBankAuthUrl} from "../../utils/externalUrlHelper";

const baseUrl = `${API_URL}/aisp/v1`;

const getAccountData = async (bankId, dispatch, getState) => {
    try {
        const accountsResponse = await axios.get(`${baseUrl}/accounts`, {headers: {"x-tpp-bankid": bankId}});
        const balancesResponse = await axios.get(`${baseUrl}/balances`, {headers: {"x-tpp-bankid": bankId}})
        const accounts = toCamel(accountsResponse.data).data.account;
        const balances = toCamel(balancesResponse.data).data.balance;
        const extendedAccounts = accounts.map(account => {
            const balance = balances.find(b => b.accountId === account.accountId);
            return {...account, balance, bankId};
        });
        if (dispatch && getState) {
            const allAccounts = getState().accounts.accounts.concat(
                extendedAccounts
            );
            dispatch(getAccountsSucceeded(allAccounts));
        }
    } catch (error) {
        console.log(error);
        if (error.response.status === 428) {
            const newError = error.response;
            newError.bankId = bankId;
            throw newError;
        }
        dispatch(getAccountsFailed(error.response));
    }
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
            console.log(error);
            const consentId = error.headers["x-tpp-consentid"];
            openBankAuthUrl(bank, consentId);
        });
    }
};

const periodQueryBuilder = (period) => {
    let periodQuery = "";
    if (period) {
        periodQuery = "?";
        if (period.from) {
            periodQuery += `fromBookingDateTime=${period.from}`;
        }
        if (period.to) {
            periodQuery += (periodQuery.length > 1 ? '&' : '') + `toBookingDateTime=${period.to}`;
        }
    }
    return periodQuery;
};

export const getAccount = (accountId, bankId, period) => async dispatch => {
    dispatch(getAccountRequested());

    try {
      const accountResponse = await axios.get(`${baseUrl}/accounts/${accountId}`, {
        headers: {"x-tpp-bankid": bankId}
      });
      const balancesResponse = await axios.get(`${baseUrl}/accounts/${accountId}/balances`, {
        headers: {"x-tpp-bankid": bankId}
      });

      const account = toCamel(accountResponse.data).data.account[0];
      const balance = toCamel(balancesResponse.data).data.balance[0];
      dispatch(getAccountSucceeded({...account, balance}));
      dispatch(getTransactions(accountId, bankId, period))


    } catch (error) {
      dispatch(getAccountFailed(error.response))
    }
};

export const getTransactions = (accountId, bankId, period) => async dispatch => {
    dispatch(getTransactionsRequested());
    try {
        const periodQuery = periodQueryBuilder(period);
        const transactionsResponse = await axios.get(`${baseUrl}/accounts/${accountId}/transactions${periodQuery}`, {
            headers: {"x-tpp-bankid": bankId}
        });
        const transactions = toCamel(transactionsResponse.data).data.transaction;
        dispatch(getTransactionsSucceeded(transactions));
    } catch (error) {
        dispatch(getTransactionsFailed(error))
    }
};
