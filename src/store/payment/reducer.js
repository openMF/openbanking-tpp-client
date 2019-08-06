import {
    APPROVE_PAYMENT_REQUEST, CLEAR_PAYMENT, CLEAR_PAYMENT_ERROR,
    CLEAR_PAYMENT_REQUEST,
    EXECUTE_PAYMENT_FAILED,
    EXECUTE_PAYMENT_REQUESTED,
    EXECUTE_PAYMENT_SUCCEEDED,
    GET_TRANSACTION_DETAILS_FAILED,
    GET_TRANSACTION_DETAILS_REQUESTED,
    GET_TRANSACTION_DETAILS_SUCCEEDED,
    SEND_PAYMENT_REQUEST,
    SET_CUSTOMER_INITIATED_PAYMENT,
    SET_PAYMENT_SUCCESS,
    SET_TRANSACTION_ID
} from "./actions";

const initialState = {
    loading: false,
    error: null,
    transaction: null
}

export const payment = (state = initialState, action) => {
    switch (action.type) {
        case SEND_PAYMENT_REQUEST:
            return {
                ...state,
                amount: action.payload.amount,
                description: action.payload.description,
                paymentRequestSent: true
            };
        case CLEAR_PAYMENT:
        case CLEAR_PAYMENT_ERROR:
        case CLEAR_PAYMENT_REQUEST:
            return initialState;
        case APPROVE_PAYMENT_REQUEST:
            return {...state, completedPayment: true};
        case SET_TRANSACTION_ID:
            return {...state, transactionId: action.payload.transactionId};
        case SET_PAYMENT_SUCCESS:
            return {...state, transactionId: action.payload.transactionId, payerId: action.payload.payerId};
        case SET_CUSTOMER_INITIATED_PAYMENT:
            return {
                ...state,
                amount: action.payload.amount,
                description: action.payload.description,
                payeeName: action.payload.payeeName,
                payeeId: action.payload.payeeId,
                clientRefId: action.payload.clientRefId
            };
        case GET_TRANSACTION_DETAILS_REQUESTED:
        case EXECUTE_PAYMENT_REQUESTED:
            return {...state, loading: true, error: null, transaction: null};
        case GET_TRANSACTION_DETAILS_FAILED:
        case EXECUTE_PAYMENT_FAILED:
            return {...state, loading: false, error: action.error, transaction: null};
        case GET_TRANSACTION_DETAILS_SUCCEEDED:
        case EXECUTE_PAYMENT_SUCCEEDED:
            return {...state, loading: false, error: null, transaction: action.payload};
        default:
            return state;
    }
};
