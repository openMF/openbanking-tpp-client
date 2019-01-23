import React from "react";
import {Route} from "react-router-dom";
import {CreatePaymentRequest} from "./CreatePaymentRequest/CreatePaymentRequest.js";
import {GeneratedPaymentRequest} from "./GeneratedPaymentRequest/GeneratedPaymentRequest.js";
import {PaymentComplete} from "./PaymentComplete/PaymentComplete.js";

export const Merchant = ({match}) => {
    return <div>
        <Route path={`${match.path}/createPaymentRequest`} component={CreatePaymentRequest}/>
        <Route path={`${match.path}/paymentRequest`} component={GeneratedPaymentRequest}/>
        <Route path={`${match.path}/paymentComplete`} component={PaymentComplete}/>
    </div>;
};
