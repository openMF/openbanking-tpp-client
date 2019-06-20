import * as actions from "./actions.js";

const initialState = {
  selectedBank: "",
  loading: false,
  error: null,
  bankList: []
};

export function bank(state = initialState, action) {
  switch (action.type) {
    case actions.SET_BANK:
      return { ...state, selectedbank: action.payload };
    case actions.GET_BANK_LIST_REQUESTED:
    case actions.REGISTER_NEW_BANK_REQUESTED:
      return { ...state, loading: true, error: null, bankList: [] };
    case actions.GET_BANK_LIST_FAILED:
    case actions.REGISTER_NEW_BANK_FAILED:
      return { ...state, loading: false, error: action.error, bankList: [] };
    case actions.GET_BANK_LIST_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        bankList: action.payload
      };
    case actions.REGISTER_NEW_BANK_SUCCEEDED:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
}
