import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import Layout from "../../../components/Layout/Layout.js";
import {QRTransaction} from "../../../models/QRTransaction.js";
import {TransactionMerchant} from "../../../models/TransactionMerchant.js";
import QRCode from 'qrcode.react';
import {fetchPaymentSuccess} from "../../../store/payment/thunks.js";
import './GeneratedPaymentRequest.scss'
import {cancelQrPoll} from '../../../store/qr/actions';

class GeneratedPaymentRequest extends PureComponent {
    state = {
        qrData: {}
    };

    componentDidMount() {
        const user = this.props.user.rawUser;
        if (user) {
            const {payment} = this.props;
            const qrData = new QRTransaction(
                new TransactionMerchant(user.banks[0].partyIdInfo, `${user.firstName} ${user.lastName}`),
                payment.amount,
                payment.description);
            this.setState({qrData});
            this.props.fetchPaymentResult(this.props.history, qrData);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.qr.isPolling) {
            setTimeout(
                () => this.props.fetchPaymentResult(this.props.history, this.state.qrData),
                1000);
            if(nextState.qrData !== this.state.qrData){
                return true;
            }
            return false;
        }
        else {
            return true;
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
    qr: state.qr
});

const matchDispatchToProps = dispatch => (
    {
        fetchPaymentResult: (history, qrData) => dispatch(fetchPaymentSuccess(history, qrData)),
        cancelPolling: () => dispatch(cancelQrPoll()),
    }
);

export default connect(mapStateToProps, matchDispatchToProps)(GeneratedPaymentRequest)
