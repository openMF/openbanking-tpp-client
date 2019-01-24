import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import {Layout} from "../../../components/Layout/Layout.js";
import {QRTransaction} from "../../../models/QRTransaction.js";
import {TransactionMerchant} from "../../../models/TransactionMerchant.js";
import QRCode from 'qrcode.react';

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
        this.setState({qrData})
        console.log(QRTransaction.decode(qrData.encode()));;
    }

    render() {
        return (<Layout>
            <h1>PaymentRequest</h1>
            <QRCode value={this.state.qrData.encode ? this.state.qrData.encode() : ''} level="M"/>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    payment: state.payment
});

export default connect(mapStateToProps)(GeneratedPaymentRequest)