import QRCode from 'qrcode.react';
import React, { PureComponent } from 'react';
import { Button } from 'react-onsenui';
import { connect } from "react-redux";
import Layout from "../../../components/Layout/Layout.js";
import { MAX_POLL_RETRY, POLL_INTERVAL } from '../../../config/server.js';
import { QRTransaction } from "../../../models/QRTransaction.js";
import { TransactionMerchant } from "../../../models/TransactionMerchant.js";
import { fetchPaymentSuccess } from "../../../store/payment/thunks.js";
import { cancelQrPoll, resetPollingCounter } from '../../../store/qr/actions';
import './GeneratedPaymentRequest.scss';

class GeneratedPaymentRequest extends PureComponent {
    state = {
        qrData: {},
        showContinuePolling: false
    };

    interval = null;

    startPolling = (qrData) => {
        if(this.state.showContinuePolling){
            this.props.resetPollingCounter();
            this.setState({showContinuePolling: false});
        }
        this.interval = setInterval(() => {
            console.log('INTERVAL', this.props.qr);
            if (this.props.qr.requestCount === 0 || (this.props.qr.isPolling && this.props.qr.requestCount < MAX_POLL_RETRY)) {
                this.props.fetchPaymentResult(this.props.history, qrData);
            } else {
                clearInterval(this.interval);
                this.setState({showContinuePolling: true});
            }
        }, POLL_INTERVAL)
    }

    componentDidMount() {
        const user = this.props.user.rawUser;
        if (user) {
            const { payment } = this.props;
            const qrData = new QRTransaction(
                new TransactionMerchant(user.banks[0].partyIdInfo, `${user.firstName} ${user.lastName}`),
                payment.amount,
                payment.description);
            this.setState({ qrData });
            ;
            this.startPolling(qrData);
        }
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
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
            { this.state.showContinuePolling && <Button modifier="large--cta" onClick={() => this.startPolling(this.state.qrData)}>Continue fetching payment informations </Button> }
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
        resetPollingCounter: () => dispatch(resetPollingCounter())
    }
);

export default connect(mapStateToProps, matchDispatchToProps)(GeneratedPaymentRequest)
