import axios from 'axios';
import {Transaction} from "../../models/transaction";
import { SERVER_URL } from "../../config/server";
import {sendPaymentRequest} from "./actions.js";

export const startPayment = history => (dispatch, getState) => {
  const {user, qr} = getState();
  const {partyIdentifier: clientId} = user.rawUser.banks[0].partyIdInfo;
  const {amount, clientRefId, note, merchant} = qr.data;

  const transaction = new Transaction(merchant.id, clientRefId, amount, note, clientId);

  axios.post(`${SERVER_URL}/pay`, {...transaction})
      .then(response => {
        if (response.status === 200) history.push('/customer/paymentComplete');
      })
      .catch(() => {
      });
};

export const createPayment = (history, amount, description) => (dispatch) => {
    dispatch(sendPaymentRequest(amount, description));
    history.push && history.push('/merchant/paymentRequest');
};