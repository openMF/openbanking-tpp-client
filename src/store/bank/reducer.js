import * as actions from "./actions.js";

const initialState = {
  selectedBank: "",
  loading: false,
  error: null,
  bankList: [],
  connectedBanks: [],
  bankAlreadyRegistered: false
};

export function bank(state = initialState, action) {
  switch (action.type) {
    case actions.SET_BANK:
      return { ...state, selectedbank: action.payload };
    // get bank list
    case actions.GET_BANK_LIST_REQUESTED:
      return { ...state, loading: true, error: null, bankList: [] };
    case actions.GET_BANK_LIST_FAILED:
      return { ...state, loading: false, error: action.error, bankList: [] };
    case actions.GET_BANK_LIST_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        bankList: action.payload
      };
    // add new bank
    case actions.ADD_NEW_BANK_REQUESTED:
      return { ...state, loading: true, bankAlreadyRegistered: false };
    case actions.ADD_NEW_BANK_FAILED:
      return { ...state, loading: false, bankAlreadyRegistered: true };
    case actions.ADD_NEW_BANK_CLEARED:
      return { ...state, loading: false, bankAlreadyRegistered: false };
    // register new bank
    case actions.REGISTER_NEW_BANK_REQUESTED:
      return { ...state, loading: true, error: null };
    case actions.REGISTER_NEW_BANK_FAILED:
      return { ...state, loading: false, error: action.error };
    case actions.REGISTER_NEW_BANK_SUCCEEDED:
      return { ...state, loading: false, error: null };
    // authorize bank
    case actions.AUTHORIZE_BANK_REQUESTED:
      return { ...state, loading: true, error: null };
    case actions.AUTHORIZE_BANK_FAILED:
      return { ...state, loading: false, error: action.error };
    case actions.authorizeBankSucceeded:
      return { ...state, loading: false, error: null };
    // get connected banks
    case actions.GET_CONNECTED_BANKS_REQUESTED:
      return { ...state, loading: true, error: null };
    case actions.GET_CONNECTED_BANKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        connectedBanks: []
      };
    case actions.GET_CONNECTED_BANKS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        connectedBanks: action.payload
      };
    case actions.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
