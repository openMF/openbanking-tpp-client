import React, {PureComponent} from 'react'
import {Layout} from "../Layout/Layout.js";
import {Button, Card, List, ListItem} from "react-onsenui";
import { NavLink } from "react-router-dom";
import {connect} from "react-redux";
import './PaymentComplete.css';

class PaymentComplete extends PureComponent {

    render() {
        const { user, payment } = this.props;
        const { role } = user;
        let text = '';

        switch (role) {
            case 'customer':
                text = "Payment successful";
                break;
            default:
                text = "Payment received";
                break;
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
                <Card className="amount">{payment.amount} {'TZS'}</Card>
                <div>
                    <img className="checkMark"
                         src="https://www.freeiconspng.com/uploads/check-mark-ok-png-10.png"
                         alt="Payment received"/>
                </div>
                <Card>
                    <h3>Confirmation</h3>
                    <List modifier={'noborder'}
                        dataSource={[['Payer Id',
                            'T-39000122 John Smith, MnaziI Mmoja Street Zanzibar'],['Account', '11223344-11223344'], ['Description', payment.description]] }
                        renderRow={(row) => (
                            <ListItem modifier='longdivider'>
                                <div>
                                    <div className="rowHeader">{row[0]}</div>
                                    <div className="rowText">{row[1]} </div></div>
                            </ListItem>
                        )}
                    />
                </Card>

                    <NavLink to={`/`}><Button modifier="large--cta">OK</Button></NavLink>

            </div>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    payment: state.payment,
    user: state.user,
});

export default connect(mapStateToProps)(PaymentComplete)
