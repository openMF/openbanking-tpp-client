import * as actions from "./actions";

const initialState = {
  loading: false,
  accounts: [],
  error: null,
  currentAccount: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ACCOUNTS_REQUESTED:
      return { ...state, loading: true, error: null, accounts: [] };
    case actions.GET_ACCOUNTS_FAILED:
      return { ...state, loading: false, error: action.error, accounts: [] };
    case actions.GET_ACCOUNTS_SUCCEEDED:
      return { ...state, loading: false, accounts: action.payload, error: null };

    case actions.GET_ACCOUNT_REQUESTED:
      return { ...state, loading: true, error: null, currentAccount: null };
    case actions.GET_ACCOUNT_FAILED:
      return { ...state, loading: false, error: action.error, currentAccount: null };
    case actions.GET_ACCOUNT_SUCCEEDED:
      return { ...state, loading: false, currentAccount: action.payload, error: null };
      
    case actions.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
