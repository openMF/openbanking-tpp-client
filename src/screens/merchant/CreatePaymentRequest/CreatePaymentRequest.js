import React, {PureComponent} from 'react'
import {Layout} from "../../../components/Layout/Layout.js";
import {Button, Input} from "react-onsenui";
import {sendPaymentRequest} from "../../../store/payment/actions";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class CreatePaymentRequest extends PureComponent {

    state = {
        amount: '',
        description: '',
    };

    render() {
        const {amount, description} = this.state;
        const {sendPaymentRequest, paymentRequestSent} = this.props;
        //TODO Implement a form to get the payment amount(TZS) and payment note(description);
        return (<Layout>
            <h1>CreatePaymentRequest</h1>
            <div>
                <Input
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
            <Button modifier="large--cta" onClick={() => sendPaymentRequest(amount, description)}>
                Create Payment Request
            </Button>
            {paymentRequestSent&&<Redirect to={'/merchant/paymentRequest'}/>}
        </Layout>)
    }
}

const matchDispatchToProps = (dispatch) => ({
    sendPaymentRequest: (amount, description) => dispatch(sendPaymentRequest(amount, description))
});

export default connect(state=> ({paymentRequestSent:state.payment.paymentRequestSent}), matchDispatchToProps) (CreatePaymentRequest);
