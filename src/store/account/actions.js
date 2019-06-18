export const GET_ACCOUNTS_REQUESTED = "GET_ACCOUNTS_REQUESTED";
export const GET_ACCOUNTS_FAILED = "GET_ACCOUNTS_FAILED";
export const GET_ACCOUNTS_SUCCEEDED = "GET_ACCOUNTS_SUCCEEDED";

export const GetAccountsRequested = () => ({
  type: GET_ACCOUNTS_REQUESTED,
});

export const GetAccountsFailed = error => ({
  type: GET_ACCOUNTS_FAILED,
  error
});

export const GetAccountsSucceeded = payload => ({
  type: GET_ACCOUNTS_SUCCEEDED,
  payload
});

export const GET_ACCOUNT_REQUESTED = "GET_ACCOUNT_REQUESTED";
export const GET_ACCOUNT_FAILED = "GET_ACCOUNT_FAILED";
export const GET_ACCOUNT_SUCCEEDED = "GET_ACCOUNT_SUCCEEDED";

export const GetAccountRequested = () => ({
  type: GET_ACCOUNT_REQUESTED,
});

export const GetAccountFailed = error => ({
  type: GET_ACCOUNT_FAILED,
  error
});

export const GetAccountSucceeded = payload => ({
  type: GET_ACCOUNT_SUCCEEDED,
  payload
});
