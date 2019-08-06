import React, {Component} from "react";
import {Icon, ProgressCircular} from "react-onsenui";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Layout from "../../../components/Layout/Layout.js";
import {executePayment} from "../../../store/payment/thunks.js";

class ExecutePayment extends Component {
    state = {
        bankId: ''
    };

    componentDidMount() {
        const {executePayment, location, match} = this.props;
        const params = new URLSearchParams(location.search);
        let bankId = params.get('bankId');
        executePayment(match.params.consentId, bankId);
        this.setState({bankId});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {transaction, history} = this.props;
        if (transaction) {
            setTimeout(
                () => history.push(`/customer/paymentComplete/${transaction.domesticPaymentId}?bankId=${this.state.bankId}`),
                2500);
        }
    }

    render() {
        const {error, loading} = this.props;
        return (
            <Layout>
                {error ? (
                    <div style={{color: "#fe3824"}}>
                        Something went wrong, please try again later.
                    </div>
                ) : loading ? (
                    <React.Fragment>
                        <ProgressCircular indeterminate/>
                        <h3>Please wait, while we execute your payment.</h3>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Icon size={32} className="fa-check-circle" style={{color: '#44db5e'}}/>
                        <h3>Payment initialized succesfully</h3>
                    </React.Fragment>
                )}
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.payment.loading,
    error: state.payment.error,
    transaction: state.payment.transaction
});

const mapDispatchToProps = dispatch => ({
    executePayment: (consentId, bankId) => dispatch(executePayment(consentId, bankId))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ExecutePayment)
);
