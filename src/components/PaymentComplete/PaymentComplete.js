import React, {PureComponent} from 'react'
import {DataList} from "../DataList/DataList.js";
import {Layout} from "../Layout/Layout.js";
import {Button, Card} from "react-onsenui";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import './PaymentComplete.css';

class PaymentComplete extends PureComponent {

    state = {
        navigate: false,
        referrer: null
    };

    modifyState = (urlType) => {
        this.setState({
            navigate: true,
            referrer: '/' + urlType
        });
    };

    render() {
        const {user, payment, qr} = this.props;
        const {role} = user;
        let text = '';
        let dataSource = [];
        let amount = 0;

        switch (role) {
            case 'customer':
                text = "Payment successful";
                amount = qr.data.amount;
                dataSource = [
                    ['Merchant Id', 'T-39000122 John Smith, MnaziI Mmoja Street Zanzibar'],
                    ['Merchant Account', '11223344-11223344'],
                    ['Description', qr.data.note]
                ];
                break;
            default:
                text = "Payment received";
                amount = payment.amount;
                dataSource = [
                    ['Customer Id', 'T-39000122 John Smith, MnaziI Mmoja Street Zanzibar'],
                    ['Customer Account', '11223344-11223344'],
                    ['Description', payment.description]
                ];
        }

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
                {this.state.navigate === true ?
                    <Redirect to={this.state.referrer}/>
                    :
                    <Button modifier="large--cta" onClick={() => {
                        this.modifyState(role)
                    }}> OK
                    </Button>
                }
            </div>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    payment: state.payment,
    user: state.user,
    qr: state.qr
});

export default connect(mapStateToProps)(PaymentComplete)