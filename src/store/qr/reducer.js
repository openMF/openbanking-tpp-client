import {CANCEL_QR_POLL, CLEAR_QR_DATA, SET_DATA} from "./actions";

const initialState = {
  data: "",
  isPolling: false,
};

function qr(state = initialState, action) {
  switch (action.type) {
    case CANCEL_QR_POLL:
      return Object.assign({}, state, {isPolling: action.payload.isPolling});
    case SET_DATA:
      return Object.assign({}, state, {data: action.payload.data}, {isPolling: true});
    case CLEAR_QR_DATA:
      return initialState;
    default:
      return state
  }
}

export default qr;
