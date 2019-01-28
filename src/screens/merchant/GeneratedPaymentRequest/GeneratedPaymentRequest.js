import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import Layout from "../../../components/Layout/Layout.js";
import {QRTransaction} from "../../../models/QRTransaction.js";
import {TransactionMerchant} from "../../../models/TransactionMerchant.js";
import QRCode from 'qrcode.react';
import {Button} from "react-onsenui";
import {NavLink} from 'react-router-dom';
import {fetchPaymentSuccess} from "../../../store/payment/thunks.js";
import './GeneratedPaymentRequest.scss'
import { cancelQrPoll } from '../../../store/qr/actions';

class GeneratedPaymentRequest extends PureComponent {
    state = {
        qrData: {}
    };

    componentDidMount() {
        const user = this.props.user.rawUser;
        if(user){
            const {payment} = this.props;
            const qrData = new QRTransaction(
                new TransactionMerchant(user.banks[0].partyIdInfo.partyIdentifier, `${user.firstName} ${user.lastName}`),
                payment.amount,
                payment.description);
            this.setState({qrData});
            this.props.fetchPaymentResult(this.props.history, qrData, this.props.match.params.colorTheme);
        }
    }

    componentWillUnmount() {
        this.props.cancelPolling();
    }

    render() {
        return (<Layout>
            <h1>Payment Request</h1>
            <QRCode
                value={this.state.qrData.encode ? this.state.qrData.encode() : ''}
                level="M"
                className="qr-size"
                size="1000"
            />
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    payment: state.payment,
});

const matchDispatchToProps = dispatch => (
    {
        fetchPaymentResult: (history, qrData, theme) => dispatch(fetchPaymentSuccess(history, qrData, theme)),
        cancelPolling: () => dispatch(cancelQrPoll()),
    }
);

export default connect(mapStateToProps, matchDispatchToProps)(GeneratedPaymentRequest)
