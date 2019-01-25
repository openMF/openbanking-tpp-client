export const SEND_PAYMENT_REQUEST = 'SEND_PAYMENT_REQUEST';
export const CLEAR_PAYMENT_REQUEST = 'CLEAR_PAYMENT_REQUEST';
export const APPROVE_PAYMENT_REQUEST = 'APPROVE_PAYMENT_REQUEST';
export const SET_TRANSACTION_ID = 'SET_TRANSACTION_ID';
export const SET_PAYMENT_SUCCESS = 'SET_PAYMENT_SUCCESS';

export const sendPaymentRequest = (amount, description) => ({
    type: SEND_PAYMENT_REQUEST, payload: {amount: amount, description: description}
});


export const clearPaymentRequest = () => ({
    type: CLEAR_PAYMENT_REQUEST, payload: {}
});

export const approvePaymentRequest = () => ({
    type: APPROVE_PAYMENT_REQUEST
});

export const setTransactionsId = (transactionId) => ({
    type: SET_TRANSACTION_ID, payload: {transactionId}
});
export const setPaymentSuccess = (transactionId, payerId) => ({
    type: SET_PAYMENT_SUCCESS, payload: {transactionId, payerId}
});