import UUID from "uuid/v1.js";

export class QRTransaction {
    constructor(merchant, amount, note){
        this.merchant = merchant;
        this.clientRefId = UUID();
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
            refUrl: `https://fake.url/orderId=${UUID()}`
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