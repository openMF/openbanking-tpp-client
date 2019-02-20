import UUID from "uuid/v1.js";

export const SEND_PAYMENT_REQUEST = 'SEND_PAYMENT_REQUEST';
export const CLEAR_PAYMENT_REQUEST = 'CLEAR_PAYMENT_REQUEST';
export const APPROVE_PAYMENT_REQUEST = 'APPROVE_PAYMENT_REQUEST';
export const SET_TRANSACTION_ID = 'SET_TRANSACTION_ID';
export const SET_PAYMENT_SUCCESS = 'SET_PAYMENT_SUCCESS';
export const SET_CUSTOMER_INITIATED_PAYMENT = 'SET_CUSTOMER_INITIATED_PAYMENT';

export const sendPaymentRequest = (amount, description) => ({
    type: SEND_PAYMENT_REQUEST, payload: {amount: amount, description: description}
});

export const setCustomerIntitiatedPayment = (payee, amount, description, clientRefId = UUID()) => ({
    type: SET_CUSTOMER_INITIATED_PAYMENT,
    payload: {
        amount,
        description,
        payeeName: payee.name,
        payeeId: payee.id,
        clientRefId
    }
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
