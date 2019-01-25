import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import {Layout} from "../../../components/Layout/Layout.js";
import {QRTransaction} from "../../../models/QRTransaction.js";
import {TransactionMerchant} from "../../../models/TransactionMerchant.js";
import QRCode from 'qrcode.react';
import {Button} from "react-onsenui";
import {clearPaymentRequest} from '../../../store/payment/actions';
import {NavLink, Redirect} from 'react-router-dom';
import {setQrData} from "../../../store/qr/actions.js";

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
            this.props.setQrData(qrData);
        }
    }

    render() {
        const {paymentRequestSent, clearPaymentRequest} = this.props;
        return (<Layout>
            <h1>PaymentRequest</h1>
            <QRCode value={this.state.qrData.encode ? this.state.qrData.encode() : ''} level="M"/>
            <Button modifier="large--cta" onClick={() => clearPaymentRequest()}>Create new payment request</Button>
            {!paymentRequestSent && <Redirect to={'/merchant/createPaymentRequest'}/>}
            <NavLink to={`/merchant/paymentComplete`}><Button modifier="large--cta">OK</Button></NavLink>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    payment: state.payment,
    paymentRequestSent: state.payment.paymentRequestSent
});

const matchDispatchToProps = dispatch => (
    {
        clearPaymentRequest: () => dispatch(clearPaymentRequest()),
        setQrData: data => dispatch(setQrData(data)),
    }
);

export default connect(mapStateToProps, matchDispatchToProps)(GeneratedPaymentRequest)
