export const SET_BANK = "SET_BANK";

export const setBank = theme => ({
  type: SET_BANK,
  payload: theme
});

// get bank list
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

// add new bank
export const ADD_NEW_BANK_REQUESTED = "ADD_NEW_BANK_REQUESTED";
export const ADD_NEW_BANK_FAILED = "ADD_NEW_BANK_FAILED";
export const ADD_NEW_BANK_CLEARED = "ADD_NEW_BANK_CLEARED";

export const addNewBankRequested = () => ({
  type: ADD_NEW_BANK_REQUESTED
});

export const addNewBankFailed = () => ({
  type: ADD_NEW_BANK_FAILED
});

export const addNewBankCleared = () => ({
  type: ADD_NEW_BANK_CLEARED
});

// authorize bank
export const AUTHORIZE_BANK_REQUESTED = "AUTHORIZE_BANK_REQUESTED";
export const AUTHORIZE_BANK_FAILED = "AUTHORIZE_BANK_FAILED";
export const AUTHORIZE_BANK_SUCCEEDED = "AUTHORIZE_BANK_SUCCEEDED";

export const authorizeBankRequested = () => ({
  type: AUTHORIZE_BANK_REQUESTED
});

export const authorizeBankFailed = error => ({
  type: AUTHORIZE_BANK_FAILED,
  error
});

export const authorizeBankSucceeded = payload => ({
  type: AUTHORIZE_BANK_SUCCEEDED,
  payload
});

// register new bank
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

// get connected banks
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

// clear error
export const CLEAR_ERROR = "CLEAR_ERROR";

export const clearError = () => ({ type: CLEAR_ERROR });
