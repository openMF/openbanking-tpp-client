import {
  LOGIN_COMPLETED,
  LOGIN_FAILED,
  LOGIN_STARTED,
  SELECT_USER,
  LOGOUT,
  INIT_APP
} from "./actions";

const initialState = {
  initialized: false
};

export function user(state = initialState, action) {
  switch (action.type) {
    case INIT_APP:
      return { ...state, initialized: true };
    case SELECT_USER:
      return action;
    case LOGIN_STARTED:
      return { ...state, loading: true, error: null, username: null };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: "Username or password is incorrect"
      };
    case LOGIN_COMPLETED:
      return {
        ...state,
        loading: false,
        rawUser: action.payload.user,
        username: action.payload.user.username,
        role: action.payload.user.role,
        fullname: `${action.payload.user.firstName} ${
          action.payload.user.lastName
        }`
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
