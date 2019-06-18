import * as actions from "./actions";

const initialState = {
  loading: false,
  accounts: [],
  error: null,
  currentAccount: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_ACCOUNTS_REQUESTED:
      return { ...state, loading: true, error: null, accounts: [] };
    case actions.GET_ACCOUNTS_FAILED:
      return { ...state, loading: false, error: payload, accounts: [] };
    case actions.GET_ACCOUNTS_SUCCEEDED:
      return { ...state, loading: false, accounts: payload, error: null };

    case actions.GET_ACCOUNT_REQUESTED:
      return { ...state, loading: true, error: null, currentAccount: null };
    case actions.GET_ACCOUNT_FAILED:
      return { ...state, loading: false, error: payload, currentAccount: null };
    case actions.GET_ACCOUNT_SUCCEEDED:
      return { ...state, loading: false, currentAccount: payload, error: null };

    default:
      return state;
  }
};
