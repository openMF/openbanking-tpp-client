export const SET_DATA = "SET_DATA";
export const CANCEL_QR_POLL = "CANCEL_QR_POLL";
export const CLEAR_QR_DATA = "CLEAR_QR_DATA";
export const RESET_POLLING_COUNTER = "RESET_POLLING_COUNTER";

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

export const clearQrData = () => ({
    type: CLEAR_QR_DATA
});

export const resetPollingCounter = () => ({
    type: RESET_POLLING_COUNTER
})
