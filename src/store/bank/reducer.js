import {SET_BANK} from "./actions.js";

const initialState = '';

export function bank(state = initialState, action) {
    switch (action.type) {
        case SET_BANK:
            return action.payload;
        default:
            return state;
    }
}
