import React, {PureComponent} from 'react'
import {Layout} from "../../../components/Layout/Layout.js";
import {connect} from "react-redux";
import {approvePaymentRequest} from "../../../store/payment/actions";
import {Card} from "react-onsenui";
import Button from "react-onsenui/src/components/Button";

class ApprovePayment extends PureComponent {
    render() {
        const {data} = this.props;
        return (<Layout>
            <h1>ApprovePayment</h1>
            <Card>
                <p>Name: {data.merchant.name}</p>
            </Card>
            <Card>
                <p>Note: {data.note}</p>
            </Card>
            <Card>
                <p>Amount: {data.amount}</p>
            </Card>
            <Button modifier="large--cta" onClick={() => this.props.approve()}>
                Approve
            </Button>
            </Layout>)
    }
}

const mapStateToProps = state => ({
   data: state.qr.data,
});

const matchDispatchToProps = dispatch => ({
    approve: () => dispatch(approvePaymentRequest()),
});

export default connect(mapStateToProps, matchDispatchToProps) (ApprovePayment)