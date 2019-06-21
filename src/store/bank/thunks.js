import axios from "axios";
import UUID from "uuid/v1.js";
import {
  getBankListRequested,
  getBankListFailed,
  getBankListSucceeded,
  registerNewBankRequested,
  registerNewBankFailed,
  registerNewBankSucceeded,
  getConnectedBanksRequested,
  getConnectedBanksFailed,
  getConnectedBanksSucceeded
} from "./actions";
import { getConsentIdForBankRegistration } from "../account/thunks";
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

export const addNewBank = bank => async dispatch => {
  const consentId = await getConsentIdForBankRegistration(bank.bankId);
  const authUrl = `${
    bank.authorizeUrl
  }?response_type=code&scope=openid profile accounts&client_id=${
    bank.clientId
  }&redirect_uri=${bank.callbackUrl}&nonce=${UUID()}&consentId=${consentId}`;
  console.log(encodeURI(authUrl));
  // window.location.assign(encodeURI(authUrl));
};

export const registerNewBank = consentId => async dispatch => {
  dispatch(registerNewBankRequested());

  try {
    await axios.post(`${API_URL}/consents/${consentId}`);
    dispatch(registerNewBankSucceeded());
  } catch (error) {
    dispatch(registerNewBankFailed(error));
    throw error;
  }
};

export const getConnectedBanks = () => dispatch => {
  dispatch(getConnectedBanksRequested());

  axios
    .get(`${API_URL}/user/v1/banks`)
    .then(res => {
      const banks = toCamel(res.data).bankInfo;
      dispatch(getConnectedBanksSucceeded(banks));
    })
    .catch(error => dispatch(getConnectedBanksFailed(error)));
};
