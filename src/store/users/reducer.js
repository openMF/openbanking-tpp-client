import {SELECT_USER} from "./actions";

function user(state = {}, action) {
    switch (action.type) {
        case SELECT_USER:
            return action;
        default:
            return state
    }
}

export default user;
