import {APPROVE_PAYMENT_REQUEST, SEND_PAYMENT_REQUEST} from "./actions";


export const payment = (state = {}, action) => {
    switch (action.type) {
        case SEND_PAYMENT_REQUEST:
            return {...state, amount: action.payload.amount, description: action.payload.description};
        case APPROVE_PAYMENT_REQUEST:
            return {...state, completedPayment: true};
        default:
            return state;
    }
};
