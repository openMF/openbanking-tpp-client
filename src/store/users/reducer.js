import {LOGIN_COMPLETED, LOGIN_FAILED, LOGIN_STARTED, SELECT_USER} from "./actions";

function user(state = {}, action) {
    switch (action.type) {
        case SELECT_USER:
            return action;
        case LOGIN_STARTED:
            return {...state, loading: true, error: null, username: null};
        case LOGIN_FAILED:
            return {...state, loading: false, error: "You cannot login to this bank with this user name"};
        case LOGIN_COMPLETED:
            return {...state, loading: false, username: action.payload.username, role: action.payload.role};
        default:
            return state
    }
}

export default user;
