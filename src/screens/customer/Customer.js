import React from "react"
import {Route} from "react-router-dom";
import {ApprovePayment} from "./ApprovePayment/ApprovePayment.js";
import {PaymentComplete} from "./PaymentComplete/PaymentComplete.js";
import {ReadPaymentRequest} from "./ReadPaymentRequest/ReadPaymentRequest.js";

export const Customer = ({match}) => {
    return <div>
        <Route path={`${match.path}/readPaymentRequest`} component={ReadPaymentRequest}/>
        <Route path={`${match.path}/approvePayment`} component={ApprovePayment}/>
        <Route path={`${match.path}/paymentComplete`} component={PaymentComplete}/>
    </div>;
};