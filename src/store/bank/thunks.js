import axios from "axios";
import {
  getBankListRequested,
  getBankListFailed,
  getBankListSucceeded,
  registerNewBankRequested,
  registerNewBankFailed,
  registerNewBankSucceeded
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

export const registerNewBank = consentId => dispatch => {
  dispatch(registerNewBankRequested());

  return axios
    .post(`${API_URL}/consents/${consentId}`)
    .then(res => {
      const banks = toCamel(res.data).bankInfoList;
      dispatch(registerNewBankSucceeded(banks));
    })
    .catch(error => {
      dispatch(registerNewBankFailed(error));
      throw error;
    });
};
