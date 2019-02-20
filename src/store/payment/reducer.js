import {
    APPROVE_PAYMENT_REQUEST,
    SEND_PAYMENT_REQUEST,
    CLEAR_PAYMENT_REQUEST,
    SET_TRANSACTION_ID,
    SET_PAYMENT_SUCCESS, SET_CUSTOMER_INITIATED_PAYMENT
} from "./actions";


export const payment = (state = {}, action) => {
    switch (action.type) {
        case SEND_PAYMENT_REQUEST:
            return {
                ...state,
                amount: action.payload.amount,
                description: action.payload.description,
                paymentRequestSent: true
            };
        case CLEAR_PAYMENT_REQUEST:
            return {};
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
        default:
            return state;
    }
};
