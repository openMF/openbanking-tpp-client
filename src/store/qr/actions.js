export const SET_DATA = "SET_DATA";
export const CANCEL_QR_POLL = "CANCEL_QR_POLL";

export const setQrData = data => ({
  type: SET_DATA,
  payload: {
    data: data
  }
});

export const cancelQrPoll = () => ({
  type: CANCEL_QR_POLL,
  payload: {
    isPolling: false
  }
});
