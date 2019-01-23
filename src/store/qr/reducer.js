import {SET_DATA} from "./actions";

const initialState = {
  data: "",
};

function qr(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      console.log('state: ', Object.assign({}, state, {data: action.payload.data}));
      return Object.assign({}, state, {data: action.payload.data});
    default:
      return state
  }
}

export default qr;
