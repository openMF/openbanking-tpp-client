import React, {PureComponent} from 'react'
import {clearPaymentRequest} from "../../store/payment/actions.js";
import {executePayment} from "../../store/payment/thunks.js";
import {setQrData} from "../../store/qr/actions.js";
import {DataList} from "../DataList/DataList.js";
import Layout from "../Layout/Layout.js";
import {Button, Card} from "react-onsenui";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import './PaymentComplete.css';

class PaymentComplete extends PureComponent {

    componentDidMount() {
        const {executePayment, match, location} = this.props;
        const params = new URLSearchParams(location.search);
        executePayment(match.params.consentId, params.get('bankId'))
    }

    componentWillUnmount() {
        this.props.clearPaymentRequest();
        this.props.clearQrData();
    }

    render() {
        const {user, qr, payment} = this.props;
        const {role} = user;
        let text = '';
        let dataSource = [];
        let amount = qr.data ? qr.data.amount : payment.amount;

        switch (role) {
            case 'customer':
                text = "Payment initiated";
                dataSource = [
                    qr.data ? ['Merchant Name', qr.data.merchant.name] : ['Payee Name', payment.payeeName],
                    qr.data ? ['Merchant Account', qr.data.merchant.id] : ['Payee Account', payment.payeeId]
                ];
                break;
            default:
                text = "Payment received";
                dataSource = [
                    [qr.data ? 'Customer Name' : 'Payer Name', 'John Smith'],
                    [qr.data ? 'Customer Account' : 'Payer Account', payment.payerId]
                ];
        }

        dataSource = [...dataSource, ...[
            ['Description', qr.data ? qr.data.note : payment.description],
            ['Merchant transaction reference', qr.data ? qr.data.clientRefId : payment.clientRefId],
            ['Transaction id:', payment.transactionId]
        ]];

        return (<Layout>
            <div className="wrapper">
                <div className="text">
                    <h1>{text}</h1>
                </div>
                <Card className="amount">{amount} {'TZS'}</Card>
                <div>
                    <img className="checkMark"
                         src="https://www.freeiconspng.com/uploads/check-mark-ok-png-10.png"
                         alt="Payment received"/>
                </div>

                <DataList modifier="noborder" title="Confirmation" dataSource={dataSource}
                />

                <NavLink to={`/`}><Button
                    modifier="large--cta">OK</Button></NavLink>
            </div>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    qr: state.qr,
    payment: state.payment
});

const mapDispatchToProps = (dispatch) => ({
    clearPaymentRequest: () => dispatch(clearPaymentRequest()),
    clearQrData: () => dispatch(setQrData(null)),
    executePayment: (consentId, bankId) => dispatch(executePayment(consentId, bankId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComplete)
