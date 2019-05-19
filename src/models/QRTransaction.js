import UUID from "uuid/v1.js";
import {TransactionMerchant} from "./TransactionMerchant";

export class QRTransaction {
    constructor(merchant, amount, note, clientRefId, currency = 'TZS', refURL = `https://webshop.dpc.hu/orderId=${UUID()}`){
        this.merchant = merchant;
        this.clientRefId = clientRefId || UUID();
        this.note = note;
        this.amount = amount
        this.currency = currency;
        this.refURL = refURL;
    }

    encode() {
        const data = {
            pa: this.merchant.idType + '::' + this.merchant.id,
            pn: this.merchant.name,
            mc: this.merchant.code,
            tr: this.clientRefId,
            tn: this.note,
            am: this.amount,
            cu: this.currency,
            refUrl: this.refURL
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

    static decode(urlString) {
        const rawQrDataArray = urlString.replace('upi://pay?', '').split('&');
        const rawQrData = {};
        for (const value of rawQrDataArray){
            const [prop, val] = value.split('=');
            rawQrData[prop] = decodeURI(val);
        }



        return new QRTransaction(
            new TransactionMerchant(rawQrData.pa, rawQrData.pn, rawQrData.mc),
            rawQrData.am,
            rawQrData.tn,
            rawQrData.tr,
        );
    }
}
