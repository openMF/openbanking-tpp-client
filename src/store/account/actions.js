export const GET_ACCOUNTS_REQUESTED = "GET_ACCOUNTS_REQUESTED";
export const GET_ACCOUNTS_FAILED = "GET_ACCOUNTS_FAILED";
export const GET_ACCOUNTS_SUCCEEDED = "GET_ACCOUNTS_SUCCEEDED";

export const getAccountsRequested = () => ({
    type: GET_ACCOUNTS_REQUESTED,
});

export const getAccountsFailed = error => ({
    type: GET_ACCOUNTS_FAILED,
    error
});

export const getAccountsSucceeded = payload => ({
    type: GET_ACCOUNTS_SUCCEEDED,
    payload
});

export const GET_ACCOUNT_REQUESTED = "GET_ACCOUNT_REQUESTED";
export const GET_ACCOUNT_FAILED = "GET_ACCOUNT_FAILED";
export const GET_ACCOUNT_SUCCEEDED = "GET_ACCOUNT_SUCCEEDED";

export const getAccountRequested = () => ({
    type: GET_ACCOUNT_REQUESTED,
});

export const getAccountFailed = error => ({
    type: GET_ACCOUNT_FAILED,
    error
});

export const getAccountSucceeded = payload => ({
    type: GET_ACCOUNT_SUCCEEDED,
    payload
});

export const GET_TRANSACTIONS_REQUESTED = "GET_TRANSACTIONS_REQUESTED";
export const GET_TRANSACTIONS_FAILED = "GET_TRANSACTIONS_FAILED";
export const GET_TRANSACTIONS_SUCCEEDED = "GET_TRANSACTIONS_SUCCEEDED";

export const getTransactionsRequested = () => ({
    type: GET_TRANSACTIONS_REQUESTED
});

export const getTransactionsFailed = error => ({
    type: GET_TRANSACTIONS_FAILED,
    error
});

export const getTransactionsSucceeded = (payload) => ({
  type: GET_TRANSACTIONS_SUCCEEDED,
  payload
});

// clear error
export const CLEAR_ERROR = "CLEAR_ERROR";

export const clearError = () => ({type: CLEAR_ERROR});
