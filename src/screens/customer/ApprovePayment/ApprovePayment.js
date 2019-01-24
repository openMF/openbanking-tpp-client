import React, {PureComponent} from 'react'
import {Layout} from "../../../components/Layout/Layout.js";
import {connect} from "react-redux";
import {Card} from "react-onsenui";
import Button from "react-onsenui/src/components/Button";
import {startPayment} from "../../../store/payment/thunks";

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
                <p>Amount: {data.amount} TZS</p>
            </Card>
            <Button modifier="large--cta" onClick={() => this.props.startPayment(this.props.history)}>
                Approve
            </Button>
            </Layout>)
    }
}

const mapStateToProps = state => ({
   data: state.qr.data,
});

const matchDispatchToProps = dispatch => ({
    startPayment: history => dispatch(startPayment(history)),
});

export default connect(mapStateToProps, matchDispatchToProps) (ApprovePayment)