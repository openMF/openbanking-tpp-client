import {SELECT_USER} from "./actions";

function selectUser(state = {}, action) {
    switch (action.type) {
        case SELECT_USER:
            return action;
        default:
            return state
    }
}