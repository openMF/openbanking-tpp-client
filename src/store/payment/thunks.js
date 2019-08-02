import axios from 'axios';
import UUID from "uuid/v1.js";
import {Transaction} from "../../models/transaction";
import {API_URL, getServerUrl, getTenantId} from "../../config/server";
import {openBankPaymentAuthUrl} from "../../utils/externalUrlHelper.js";
import {setQrData} from "../qr/actions.js";
import {sendPaymentRequest, setCustomerIntitiatedPayment, setPaymentSuccess, setTransactionsId} from "./actions.js";

const baseUrl = `${API_URL}/pisp/v1`;

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
                const payerId = response.data.originalRequestData ? response.data.originalRequestData.payer.partyIdInfo.partyIdentifier : bank === "lion" ? "27710203999" : "27710101999";
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

export const preparePayment = (bankId, amount, currency, payeeId, payerAccountId, note) => (dispatch, getState) => {
    axios.post(`${baseUrl}/preparePayment`, {
            "Data": {
                "Initiation": {
                    "InstructionIdentification": UUID(),
                    "EndToEndIdentification": UUID(),
                    "InstructedAmount": {
                        "Amount": amount,
                        "Currency": currency
                    },
                    "CreditorAccount": {
                        "SchemeName": "UK.OBIE.Paym",
                        "Identification": payeeId,
                        "Name": "unknown"
                    },
                    "DebtorAccount": {
                        "SchemeName": "UK.OBIE.BBAN",
                        "Identification": payerAccountId
                    },
                    "SupplementaryData": {
                        "interopData": {
                            "amountType": "RECEIVE",
                            "note": note,
                            "transactionType": {
                                "scenario": "TRANSFER",
                                "initiator": "PAYER",
                                "initiatorType": "CONSUMER"
                            }
                        }
                    }
                }
            },
            "Risk": {}
        },
        {
            headers: {
                "x-tpp-bankid": bankId
            }
        }
    ).then(response => {
        const consentId = response.headers['x-tpp-consentid'];
        const bank = getState().bank.connectedBanks.find(bank => bank.bankId === bankId);
        openBankPaymentAuthUrl(bank, consentId);
    })
};

export const executePayment = (consentId, bankId) => dispatch => {
    console.log('consentID', consentId);
    console.log('bankid', bankId);
    axios.post(`${baseUrl}/executePayment/${consentId}`, {}, {headers: {"x-tpp-bankid": bankId}})
        .then((response) => {
        });
};
