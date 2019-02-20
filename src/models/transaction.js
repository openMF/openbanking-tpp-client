import {DateTime} from 'luxon';

export class Transaction {

  constructor(merchant, clientRefId, amount, note, customer, scenario = 'PAYMENT') {
    this.payer = new PartyIdInfo(customer);
    this.payee = new PartyIdInfo(merchant, 'merchant');
    this.amountType = "RECEIVE";
    this.amount = {
      amount,
      currency: "TZS"
    };
    this.clientRefId = clientRefId;
    this.transactionType = {
      scenario,
      "initiator": "PAYER",
      "initiatorType": "CONSUMER"
    };
    this.note = note;
    this.expiration = DateTime.local().plus({minutes: 5}).toISO();
  }


}

class PartyIdInfo {
  constructor(id, type) {
    console.log('PartyIdInfo', id);
    this.partyIdInfo = {...id};
    if (type === 'merchant') {
      this.partyIdInfo.merchantClassificationCode = ""
    }
  }
}
