import React, {PureComponent} from 'react'
import {Button, Card} from "react-onsenui";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {clearPayment, clearPaymentError} from "../../store/payment/actions.js";
import {getTransactionDetail} from "../../store/payment/thunks.js";
import {DataList} from "../DataList/DataList.js";
import ErrorDialog from "../ErrorDialog/ErrorDialog.js";
import Layout from "../Layout/Layout.js";
import Loading from "../Loading/Loading.js";
import './PaymentComplete.css';

class PaymentComplete extends PureComponent {

    componentDidMount() {
        const {match, location, getTransactionDetails} = this.props;
        const params = new URLSearchParams(location.search);
        getTransactionDetails(match.params.transactionId, params.get('bankId'))
    }

    componentWillUnmount() {
        this.props.clearPayment()
    }

    render() {
        const {transaction, loading, error} = this.props;
        let dataSource = [];
        const transactionAvailable = !loading && transaction;
        let amount = ``;
        if (transaction) {
            const instructedAmount = transaction.initiation.instructedAmount;
            amount = instructedAmount ? `${instructedAmount.amount} ${instructedAmount.currency}` : ``;
            dataSource = [
                ['Payer Name', transaction.initiation.debtorAccount.name],
                ['Payer Account', `${transaction.initiation.debtorAccount.schemeName} ${transaction.initiation.debtorAccount.identification}`],
                ['Payee Name', transaction.initiation.creditorAccount.name],
                ['Payee Account', `${transaction.initiation.creditorAccount.schemeName} ${transaction.initiation.creditorAccount.identification}`],
                ['Description', transaction.initiation.supplementaryData.interopData.note],
                ['Transaction id:', transaction.domesticPaymentId],
                ['Status:', transaction.status],
                ...transaction.charges.map(charge => [charge.chargeBearer, `${charge.amount.amount} ${charge.amount.currency}`])
            ]
        }

        return (<Layout>
            {transactionAvailable &&
            <div className="wrapper">
                <div className="text">
                    <h1>Payment initiated</h1>
                </div>
                <Card className="amount">{amount}</Card>

                <DataList modifier="noborder" dataSource={dataSource}/>

                <NavLink to={`/`}><Button
                    modifier="large--cta">OK</Button></NavLink>
            </div>}
            <Loading isOpen={loading}/>
            <ErrorDialog
                isOpen={!!error}
                close={this.props.clearError}
                title="Something went wrong"
                message={error ? error.data : null}
            />

        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    transaction: state.payment.transaction,
    loading: state.payment.loading,
    error: state.payment.error
});

const mapDispatchToProps = (dispatch) => ({
    clearError: () => dispatch(clearPaymentError()),
    clearPayment: () => dispatch(clearPayment()),
    getTransactionDetails: (transactionID, bankId) => dispatch(getTransactionDetail(transactionID, bankId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComplete)
