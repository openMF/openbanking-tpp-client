import {
    APPROVE_PAYMENT_REQUEST,
    SEND_PAYMENT_REQUEST,
    CLEAR_PAYMENT_REQUEST,
    SET_TRANSACTION_ID,
    SET_PAYMENT_SUCCESS
} from "./actions";


export const payment = (state = {}, action) => {
    switch (action.type) {
        case SEND_PAYMENT_REQUEST:
            return {...state, amount: action.payload.amount, description: action.payload.description, paymentRequestSent: true};
        case CLEAR_PAYMENT_REQUEST:
            return {...state, amount:null, description:null, paymentRequestSent: false, transactionId: ''};
        case APPROVE_PAYMENT_REQUEST:
            return {...state, completedPayment: true};
        case SET_TRANSACTION_ID:
            return {...state, transactionId: action.payload.transactionId};
        case SET_PAYMENT_SUCCESS:
            return {...state, transactionId: action.payload.transactionId, payerId: action.payload.payerId};
        default:
            return state;
    }
};
