import {combineReducers} from "redux";
import qr from './qr/reducer';
import {user} from './users/reducer';
import {payment} from "./payment/reducer";

export const rootReducer = combineReducers({user, payment, qr});