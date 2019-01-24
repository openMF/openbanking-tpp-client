import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import Layout from "../../../components/Layout/Layout.js";
import {QRTransaction} from "../../../models/QRTransaction.js";
import {TransactionMerchant} from "../../../models/TransactionMerchant.js";
import QRCode from 'qrcode.react';
import {Button} from "react-onsenui";
import {NavLink} from 'react-router-dom';

class GeneratedPaymentRequest extends PureComponent {
    state = {
        qrData: {}
    };

    componentDidMount() {
        const {payment} = this.props;
        const user = this.props.user.rawUser;
        const qrData = new QRTransaction(
            new TransactionMerchant(user.username, `${user.firstName} ${user.lastName}`),
            payment.amount,
            payment.description);
        this.setState({qrData});
        console.log(QRTransaction.decode(qrData.encode()));
    }

    render() {
        const {paymentRequestSent, clearPaymentRequest} = this.props;
        return (<Layout>
            <h1>PaymentRequest</h1>
            <QRCode value={this.state.qrData.encode ? this.state.qrData.encode() : ''} level="M"/>
            <NavLink to={`/merchant/createPaymentRequest`}><Button modifier="large--cta">Create new payment request</Button></NavLink>
            <NavLink to={`/merchant/paymentComplete`}><Button modifier="large--cta">OK</Button></NavLink>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    payment: state.payment,
});

export default connect(mapStateToProps, null)(GeneratedPaymentRequest)

