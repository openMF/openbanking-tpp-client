import {LOGIN_COMPLETED, LOGIN_FAILED, LOGIN_STARTED, SELECT_USER} from "./actions";

export function user(state = {}, action) {
    switch (action.type) {
        case SELECT_USER:
            return action;
        case LOGIN_STARTED:
            return {...state, loading: true, error: null, username: null};
        case LOGIN_FAILED:
            return {...state, loading: false, error: "You cannot login to this bank with these credentials"};
        case LOGIN_COMPLETED:
            return {...state, loading: false,
                rawUser: action.payload.user,
                username: action.payload.user.username,
                role: action.payload.user.role};
        default:
            return state
    }
}
