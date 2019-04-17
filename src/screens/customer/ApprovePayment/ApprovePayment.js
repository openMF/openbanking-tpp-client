import React, {PureComponent} from 'react'
import {DataList} from "../../../components/DataList/DataList.js";
import Layout from "../../../components/Layout/Layout.js";
import {connect} from "react-redux";
import {Button, Card, Icon} from "react-onsenui";
import {startPayment} from "../../../store/payment/thunks";

class ApprovePayment extends PureComponent {
    render() {
        const {data} = this.props;
        return (<Layout>
            <h1>Approve Payment</h1>

            <Card className="amount">
                {data.amount} {'TZS'} <br/>
                {data.note}
            </Card>

            <DataList modifier="noborder" dataSource={[
                ['Merchant:', data.merchant.name],
                ['Merchant account:', data.merchant.id]
            ]}/>
            <br/>
            <Button modifier="large--cta" onClick={() => this.props.startPayment(this.props.history)} style={{backgroundColor: '#00aa00'}}>
                <Icon icon={'md-check-circle'} /> Approve
            </Button>
            <br/>
            <br/>
            <Button modifier="large--cta" onClick={() => this.props.startPayment(this.props.history)} style={{backgroundColor: '#aa0000'}}>
                <Icon icon={'md-close-circle'} /> Reject
            </Button>
            </Layout>)
    }
}

const mapStateToProps = state => ({
   data: state.qr.data
});

const matchDispatchToProps = dispatch => ({
    startPayment: (history) => dispatch(startPayment(history)),
});

export default connect(mapStateToProps, matchDispatchToProps) (ApprovePayment)
