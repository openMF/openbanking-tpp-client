import React, {PureComponent} from 'react'
import {DataList} from "../../../components/DataList/DataList.js";
import Layout from "../../../components/Layout/Layout.js";
import {connect} from "react-redux";
import {Button} from "react-onsenui";
import {startPayment} from "../../../store/payment/thunks";

class ApprovePayment extends PureComponent {
    render() {
        const {data} = this.props;
        return (<Layout>
            <h1>ApprovePayment</h1>
            <DataList modifier="noborder" dataSource={[
                ['Merchant:', data.merchant.name],
                ['Merchant account:', data.merchant.id],
                ['Note:', data.note],
                ['Amount:', data.amount + ' TZS']
            ]}/>
            <Button modifier="large--cta" onClick={() => this.props.startPayment(this.props.history)}>
                Approve
            </Button>
            <Button modifier="large--cta" onClick={() => this.props.startPayment(this.props.history)}>
                Reject
            </Button>
            </Layout>)
    }
}

const mapStateToProps = state => ({
   data: state.qr.data
});

const matchDispatchToProps = dispatch => ({
    startPayment: history => dispatch(startPayment(history)),
});

export default connect(mapStateToProps, matchDispatchToProps) (ApprovePayment)
