import React from "react"
import { Redirect, Route, withRouter } from "react-router-dom";
import ApprovePayment from "./ApprovePayment/ApprovePayment.js";
import PaymentComplete from "../../components/PaymentComplete/PaymentComplete.js";
import ReadPaymentRequest from "./ReadPaymentRequest/ReadPaymentRequest.js";

export const Customer = withRouter(({match}) => {
    return <div>
        CUSTOMER

    </div>;
});
