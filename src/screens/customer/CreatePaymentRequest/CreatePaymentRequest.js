import React, {PureComponent} from 'react'
import Layout from "../../../components/Layout/Layout.js";
import {Button, Input} from "react-onsenui";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {customerInitiatedPaymentRequest} from "../../../store/payment/thunks.js";

class CreatePaymentRequest extends PureComponent {

    state = {
        amount: '',
        description: '',
        merchantId: ''
    };

    render() {
        const {amount, description, merchantId} = this.state;
        const {sendPaymentRequest} = this.props;
        return (<Layout>
            <h1>Send Payment</h1>
            <div>
                <Input
                    type="number"
                    style={{marginBottom : "15px"}}
                    value={amount} float
                    onChange={(event) => { this.setState({amount: event.target.value})} }
                    modifier='material'
                    placeholder='Amount' />
            </div>
            <div>
                <Input
                    style={{marginBottom : "15px"}}
                    value={description} float
                    onChange={(event) => { this.setState({description: event.target.value})} }
                    modifier='material'
                    placeholder='Description'
                />
            </div>
            <div>
                <Input
                    style={{marginBottom : "15px"}}
                    value={merchantId} float
                    onChange={(event) => { this.setState({merchantId: event.target.value})} }
                    modifier='material'
                    placeholder='Phone number'
                />
            </div>
            <Button modifier="large--cta" onClick={() => sendPaymentRequest({
                payeeId: merchantId, description, amount
            }, this.props.history)}>
                Create Payment Request
            </Button>
        </Layout>)
    }
}

const matchDispatchToProps = (dispatch) => ({
    sendPaymentRequest: (paymentInfo, history) => dispatch(customerInitiatedPaymentRequest(paymentInfo, history))
});

export default withRouter(connect(state=> ({paymentRequestSent:state.payment.paymentRequestSent}), matchDispatchToProps) (CreatePaymentRequest));
