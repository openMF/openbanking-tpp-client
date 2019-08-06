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

export const EXECUTE_PAYMENT_REQUESTED = 'EXECUTE_PAYMENT_REQUESTED';
export const EXECUTE_PAYMENT_FAILED = 'EXECUTE_PAYMENT_FAILED';
export const EXECUTE_PAYMENT_SUCCEEDED = 'EXECUTE_PAYMENT_SUCCEEDED';

export const executePaymentRequested = () => ({
    type: EXECUTE_PAYMENT_REQUESTED
});

export const executePaymentFailed = (error) => ({
    type: EXECUTE_PAYMENT_FAILED,
    error
});

export const executePaymentSucceeded = (payload) => ({
    type: EXECUTE_PAYMENT_SUCCEEDED,
    payload
});

export const GET_TRANSACTION_DETAILS_REQUESTED = 'GET_TRANSACTION_DETAILS_REQUESTED';
export const GET_TRANSACTION_DETAILS_FAILED = 'GET_TRANSACTION_DETAILS_FAILED';
export const GET_TRANSACTION_DETAILS_SUCCEEDED = 'GET_TRANSACTION_DETAILS_SUCCEEDED';

export const getTransactionDetailsRequested = () => ({
    type: GET_TRANSACTION_DETAILS_REQUESTED
});

export const getTransactionDetailsFailed = (error) => ({
    type: GET_TRANSACTION_DETAILS_FAILED,
    error
});

export const getTransactionDetailsSucceeded = (payload) => ({
    type: GET_TRANSACTION_DETAILS_SUCCEEDED,
    payload
});

export const CLEAR_PAYMENT_ERROR = 'CLEAR_PAYMENT_ERROR';
export const CLEAR_PAYMENT = 'CLEAR_PAYMENT';

export const clearPaymentError = () => ({
    type: CLEAR_PAYMENT_ERROR
});

export const clearPayment = () => ({
    type: CLEAR_PAYMENT
});
