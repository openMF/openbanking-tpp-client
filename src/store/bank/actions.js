export const SET_BANK = "SET_BANK";

export const setBank = theme => ({
  type: SET_BANK,
  payload: theme
});

export const GET_BANK_LIST_REQUESTED = "GET_BANK_LIST_REQUESTED";
export const GET_BANK_LIST_FAILED = "GET_BANK_LIST_FAILED";
export const GET_BANK_LIST_SUCCEEDED = "GET_BANK_LIST_SUCCEEDED";

export const getBankListRequested = () => ({
  type: GET_BANK_LIST_REQUESTED
});

export const getBankListFailed = error => ({
  type: GET_BANK_LIST_FAILED,
  error
});

export const getBankListSucceeded = payload => ({
  type: GET_BANK_LIST_SUCCEEDED,
  payload
});

export const REGISTER_NEW_BANK_REQUESTED = "REGISTER_NEW_BANK_REQUESTED";
export const REGISTER_NEW_BANK_FAILED = "REGISTER_NEW_BANK_FAILED";
export const REGISTER_NEW_BANK_SUCCEEDED = "REGISTER_NEW_BANK_SUCCEEDED";

export const registerNewBankRequested = () => ({
  type: REGISTER_NEW_BANK_REQUESTED
});

export const registerNewBankFailed = error => ({
  type: REGISTER_NEW_BANK_FAILED,
  error
});

export const registerNewBankSucceeded = payload => ({
  type: REGISTER_NEW_BANK_SUCCEEDED,
  payload
});

export const GET_CONNECTED_BANKS_REQUESTED = "GET_CONNECTED_BANKS_REQUESTED";
export const GET_CONNECTED_BANKS_FAILED = "GET_CONNECTED_BANKS_FAILED";
export const GET_CONNECTED_BANKS_SUCCEEDED = "GET_CONNECTED_BANKS_SUCCEEDED";

export const getConnectedBanksRequested = () => ({
  type: GET_CONNECTED_BANKS_REQUESTED
});

export const getConnectedBanksFailed = error => ({
  type: GET_CONNECTED_BANKS_FAILED,
  error
});

export const getConnectedBanksSucceeded = payload => ({
  type: GET_CONNECTED_BANKS_SUCCEEDED,
  payload
});
