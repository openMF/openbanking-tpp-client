import React, {PureComponent} from 'react'
import {Layout} from "../../../components/Layout/Layout.js";
import {QRTransaction} from "../../../models/QRTransaction.js";
import {TransactionMerchant} from "../../../models/TransactionMerchant.js";
import QRCode from 'qrcode.react';

export class GeneratedPaymentRequest extends PureComponent {
    render() {
        const qrData = new QRTransaction(new TransactionMerchant("1", 'Cica'), 'Gimme your money', 2000);
        console.log(qrData.encode());
        return (<Layout>
            <h1>PaymentRequest</h1>
            <QRCode value={qrData.encode()} renderAs="svg" level="M"/>
        </Layout>)
    }
}