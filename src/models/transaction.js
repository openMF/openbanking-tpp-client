import {DateTime} from 'luxon';

export class Transaction {

  constructor(merchantId, clientRefId, amount, note, customerId = '') {
    this.payer = new PartyIdInfo(customerId);
    this.payee = new PartyIdInfo(merchantId, 'merchant');
    this.amountType = "RECEIVE";
    this.transferAmount = {
      amount,
      currency: "TZS"
    };
    this.clientRefId = clientRefId;
    this.transactionType = {
      "scenario": "PAYMENT",
      "initiator": "PAYER",
      "initiatorType": "CONSUMER"
    };
    this.note = note;
    this.expiration = DateTime.local().plus({minutes: 5}).toISO();
  }


}

class PartyIdInfo {
  constructor(id, type) {
    this.partyIdInfo = {
      partyIdType: 'IBAN',
      partyIdentifier: id
    };
    if (type === 'merchant') {
      this.partyIdInfo.merchantClassificationCode = ""
    }
  }
}