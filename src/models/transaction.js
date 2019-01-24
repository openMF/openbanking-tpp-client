import {DateTime} from 'luxon';

export class Transaction {

    constructor(merchantData, clientRefId, amount, note, customerData = {}) {
        this.payer = customerData;
        this.payee = {...merchantData, merchantClassificationCode: ""};
        this.amountType = "RECEIVE";
        this.amount = {
            amount,
            currency: "TZS"
        };
        this.transactionType = {
            "scenario": "PAYMENT",
            "initiator": "PAYER",
            "initiatorType": "CONSUMER"
        };
        this.note = note;
        this.expiration = DateTime.local().plus({minutes: 5});
    }


}