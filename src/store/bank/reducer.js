import * as actions from "./actions.js";

const initialState = {
  selectedBank: "",
  loading: false,
  error: null,
  bankList: [],
  connectedBanks: []
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
    // register new bank
    case actions.REGISTER_NEW_BANK_REQUESTED:
      return { ...state, loading: true, error: null };
    case actions.REGISTER_NEW_BANK_FAILED:
      return { ...state, loading: false, error: action.error };
    case actions.REGISTER_NEW_BANK_SUCCEEDED:
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
    default:
      return state;
  }
}
