import axios from 'axios';
import {Transaction} from "../../models/transaction";
import {SERVER_URL} from "../../config/server";
import {setQrData} from "../qr/actions.js";
import {sendPaymentRequest, setPaymentSuccess, setTransactionsId} from "./actions.js";
import axiosRetry from "axios-retry";

export const startPayment = history => (dispatch, getState) => {
    const {user, qr} = getState();
    const {partyIdentifier: clientId} = user.rawUser.banks[0].partyIdInfo;
    const {amount, clientRefId, note, merchant} = qr.data;

    const transaction = new Transaction(merchant.id, clientRefId, amount, note, clientId);

    axios.post(`${SERVER_URL}`, {...transaction})
        .then(response => {
            if (response.status === 200) {
                console.log(response.data);
                dispatch(setTransactionsId(response.data.transactionId));
                history.push('/customer/paymentComplete');
            }
        })
        .catch(() => {
        });
};

export const createPayment = (history, amount, description) => (dispatch) => {
    dispatch(sendPaymentRequest(amount, description));
    history.push && history.push('/merchant/paymentRequest');
};

export const fetchPaymentSuccess = (history, qrData) => (dispatch) => {
    dispatch(setQrData(qrData));
    axiosRetry(axios, {
        retries: 500,
        shouldResetTimeout: true
    });

    axios.get(`${SERVER_URL}/client/${qrData.clientRefId}`).then(
        response => {
            dispatch(setPaymentSuccess(
                response.data.transactionId,
                response.data.originalRequestData.payer.partyIdInfo.partyIdentifier
            ));
            history.push('/merchant/paymentComplete');
        }
    ).catch(() => {
    });
};