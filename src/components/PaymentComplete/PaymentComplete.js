import React, {PureComponent} from 'react'
import {DataList} from "../DataList/DataList.js";
import Layout from "../Layout/Layout.js";
import {Button, Card} from "react-onsenui";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import './PaymentComplete.css';

class PaymentComplete extends PureComponent {

    render() {
        const {user, qr} = this.props;
        const {role} = user;
        let text = '';
        let dataSource = [];
        let amount = qr.data.amount;

        switch (role) {
            case 'customer':
                text = "Payment initiated";
                dataSource = [
                    ['Merchant Id', qr.data.merchant.id],
                    ['Merchant Account', qr.data.merchant.name]
                ];
                break;
            default:
                text = "Payment received";
                dataSource = [
                    ['Customer Name', 'John Smith'],
                    ['Customer Account', 'IC11in01tn0131d77b06141c11e9ab14d6']
                ];
        }

        dataSource = [...dataSource, ...[
            ['Description', qr.data.note],
            ['Merchant transaction reference', qr.data.clientRefId],
            ['Transaction id:', 'd78465c0-200e-11e9-afbc-137c66f18197']
        ]];

        //src="https://www.freeiconspng.com/uploads/green-check-mark-2-icon-17.png"
        //src="https://www.freeiconspng.com/uploads/check-mark-clipart-transparent-19.png"
        //src="https://www.freeiconspng.com/uploads/check-mark-green-black-icon-1.png"
        //src="https://www.freeiconspng.com/uploads/check-mark-8.png"
        //src="https://www.freeiconspng.com/uploads/check-mark-png-file-images-circle-25.png"

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

                <NavLink to={`/`}><Button modifier="large--cta">OK</Button></NavLink>
            </div>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    qr: state.qr
});

export default connect(mapStateToProps)(PaymentComplete)
