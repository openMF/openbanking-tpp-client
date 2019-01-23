import UUID from "uuid/v1.js";

export class QRTransaction {
    constructor(merchant, note, amount){
        this.merchant = merchant;
        this.clientRefId = new UUID();
        this.note = note;
        this.amount = amount
    }

    encode() {
        const data = {
            pa: this.merchant.id,
            pn: this.merchant.name,
            mc: this.merchant.code,
            tr: this.clientRefId,
            tn: this.note,
            am: this.amount,
            cu: 'TZS',
            refUrl: `https://fake.url/orderId=${this.clientRefId}`
        };
        let dataString = `upi://pay?`;
        for (const prop in data) {
            if(!dataString.match(/upi:\/\/pay\?$/)){
                dataString += '&';
            }
            dataString += `${prop}=${encodeURI(data[prop])}`;
        }
        return dataString;
    }
}