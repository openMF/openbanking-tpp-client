import axios from "axios";
import {
  getBankListRequested,
  getBankListFailed,
  getBankListSucceeded
} from "./actions";
import { API_URL } from "../../config/server";
import toCamel from "../../utils/toCamelHelper";

const baseUrl = `${API_URL}/banks/v1`;

export const getBankList = () => dispatch => {
  dispatch(getBankListRequested());

  axios
    .get(`${baseUrl}/supported`)
    .then(res => {
      const banks = toCamel(res.data).bankInfoList;
      dispatch(getBankListSucceeded(banks));
    })
    .catch(error => dispatch(getBankListFailed(error)));
};
