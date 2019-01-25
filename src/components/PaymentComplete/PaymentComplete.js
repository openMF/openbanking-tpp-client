import React, {PureComponent} from 'react'
import {DataList} from "../DataList/DataList.js";
import Layout from "../Layout/Layout.js";
import {Button, Card} from "react-onsenui";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import './PaymentComplete.css';

class PaymentComplete extends PureComponent {

    render() {
        const {user, qr, payment} = this.props;
        const {role} = user;
        let text = '';
        let dataSource = [];
        let amount = qr.data.amount;

        switch (role) {
            case 'customer':
                text = "Payment initiated";
                dataSource = [
                    ['Merchant Name', qr.data.merchant.name],
                    ['Merchant Account', qr.data.merchant.id],
                ];
                break;
            default:
                text = "Payment received";
                dataSource = [
                    ['Customer Name', 'John Smith'],
                    ['Customer Account', payment.payerId]
                ];
        }

        dataSource = [...dataSource, ...[
            ['Description', qr.data.note],
            ['Merchant transaction reference', qr.data.clientRefId],
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

                <NavLink to={`/${this.props.match.params.colorTheme}`}><Button modifier="large--cta">OK</Button></NavLink>
            </div>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    qr: state.qr,
    payment: state.payment
});

export default connect(mapStateToProps)(PaymentComplete)
