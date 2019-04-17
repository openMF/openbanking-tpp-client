import React, {PureComponent} from 'react'
import Layout from "../../../components/Layout/Layout.js";
import {Button, Input} from "react-onsenui";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {createPayment} from "../../../store/payment/thunks.js";

class CreatePaymentRequest extends PureComponent {

    state = {
        amount: '',
        description: '',
    };

    render() {
        const {amount, description} = this.state;
        const {sendPaymentRequest} = this.props;
        return (<Layout>
            <h1>Prepare Order</h1>
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
            <Button modifier="large--cta" onClick={() => sendPaymentRequest(this.props.history, amount, description)}>
                Create Payment Request
            </Button>
        </Layout>)
    }
}

const matchDispatchToProps = (dispatch) => ({
    sendPaymentRequest: (history, amount, description) => dispatch(createPayment(history, amount, description))
});

export default withRouter(connect(state=> ({paymentRequestSent:state.payment.paymentRequestSent}), matchDispatchToProps) (CreatePaymentRequest));
