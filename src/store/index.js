import {combineReducers} from "redux";
import user from './users/reducer';

export const rootReducer = combineReducers({user});