import axios from 'axios';
import UUID from "uuid/v1.js";
import {Transaction} from "../../models/transaction";
import {getServerUrl, getTenantId} from "../../config/server";
import {setQrData} from "../qr/actions.js";
import {sendPaymentRequest, setCustomerIntitiatedPayment, setPaymentSuccess, setTransactionsId} from "./actions.js";

export const customerInitiatedPaymentRequest = (paymentInformation, history) => (dispatch, getState) => {
    const {payeeId, payeeName = 'Carl Baker', description, amount, clientRefId = UUID()} = paymentInformation;
    const {user, bank} = getState();
    const payee = {id: payeeId, name: payeeName};
    const payer = user.rawUser.banks[0].partyIdInfo;
    dispatch(setQrData(null));
    dispatch(setCustomerIntitiatedPayment(payee, amount, description, clientRefId));
    const transaction = new Transaction({
        partyIdentifier: payeeId,
        partyIdType: 'MSISDN'
    }, clientRefId, amount, description, payer, 'TRANSFER');

    console.log(transaction);

    axios.post(`${getServerUrl(bank)}`, {...transaction}, {
        headers: {'X-Tenant-Identifier': getTenantId(bank)}
    })
        .then(response => {
            if (response.status === 200) {
                dispatch(setTransactionsId(response.data.transactionId));
                history.push(`/customer/paymentComplete`);
            }
        })
        .catch(() => {
        });
};

export const startPayment = (history) => (dispatch, getState) => {
    const {user, qr, bank} = getState();
    const clientId = user.rawUser.banks[0].partyIdInfo;
    const {amount, clientRefId, note, merchant} = qr.data;

    const transaction = new Transaction({
        partyIdentifier: merchant.id,
        partyIdType: merchant.idType
    }, clientRefId, amount, note, clientId);

    axios.post(`${getServerUrl(bank)}`, {...transaction}, {
        headers: {'X-Tenant-Identifier': getTenantId(bank)}
    })
        .then(response => {
            if (response.status === 200) {
                dispatch(setTransactionsId(response.data.transactionId));
                history.push(`/customer/paymentComplete`);
            }
        })
        .catch(() => {
        });
};

export const createPayment = (history, amount, description) => (dispatch) => {
    dispatch(sendPaymentRequest(amount, description));
    history.push && history.push(`/merchant/paymentRequest`);
};

export const fetchPaymentSuccess = (history, qrData) => (dispatch, getState) => {
    dispatch(setQrData(qrData));
    const {bank} = getState();
    axios.get(`${getServerUrl(bank)}/client/${qrData.clientRefId}`).then(
        response => {
            if (response.data.transferState === 'COMMITTED') {
                const payerId = response.data.originalRequestData ? response.data.originalRequestData.payer.partyIdInfo.partyIdentifier : "27710203999"
                dispatch(setPaymentSuccess(
                    response.data.transactionId,
                    payerId
                ));
                history.push(`/merchant/paymentComplete`);
            }
        }
    ).catch(() => {
    });
};
