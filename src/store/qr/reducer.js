import { CANCEL_QR_POLL, CLEAR_QR_DATA, SET_DATA, RESET_POLLING_COUNTER } from "./actions";

const initialState = {
  data: "",
  isPolling: false,
  requestCount: 0
};

function qr(state = initialState, action) {
  switch (action.type) {
    case CANCEL_QR_POLL:
      return Object.assign({}, state, { isPolling: action.payload.isPolling, requestCount: 0 });
    case SET_DATA:
      return Object.assign({}, state, { data: action.payload.data }, { isPolling: true, requestCount: ++state.requestCount || 0 });
    case CLEAR_QR_DATA:
      return initialState;
    case RESET_POLLING_COUNTER:
      return Object.assign({}, state, { requestCount: 0 });
    default:
      return state
  }
}

export default qr;
