import {SEND_PAYMENT_REQUEST} from "./actions";


export const payment = (state = {}, action) => {
    switch (action.type) {
        case SEND_PAYMENT_REQUEST:
            return {...state, amount: action.payload.amount, description: action.payload.description};
        default:
            return state;
    }
};
