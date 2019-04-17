import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';
import Customer from "./screens/customer";
import Merchant from "./screens/merchant";
import Login from "./screens/login";
import CreatePaymentRequest from './screens/merchant/CreatePaymentRequest/CreatePaymentRequest';
import GeneratedPaymentRequest from './screens/merchant/GeneratedPaymentRequest/GeneratedPaymentRequest';
import ReadPaymentRequest from './screens/customer/ReadPaymentRequest/ReadPaymentRequest';
import ApprovePayment from './screens/customer/ApprovePayment/ApprovePayment';
import PaymentComplete from './components/PaymentComplete/PaymentComplete';
import CustomerInitiatedPayment from './screens/customer/CreatePaymentRequest/CreatePaymentRequest'
import './green-gold.scss';
import './gold-red.scss';
import './dark.scss';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {setBank} from "./store/bank/actions.js";




const NavRootW = (props) => {

    const theme = window.location.href.match(/(lion|buffalo|rhino|elephant)/)[0];
    props.setTheme(theme);
    return (<div className={`App ${theme}`}>
        <div>
            <div>
                <Switch>
                    <Route path={`/login`} component={Login} />

                    <Route exact path={`/`} render={
                        () => !props.role ?
                            <Redirect to={`/login`} /> :
                            <Redirect to={
                                props.role==='customer'
                                    ?`/customer/readPaymentRequest`:
                                    `/merchant/createPaymentRequest`
                            }
                            />
                    }/>
                    <ProtectedRoute exact path={`/customer`} component={Customer} />
                    <ProtectedRoute path={`/customer/readPaymentRequest`} component={ReadPaymentRequest}/>
                    <ProtectedRoute path={`/customer/createPaymentRequest`} component={CustomerInitiatedPayment}/>
                    <ProtectedRoute path={`/customer/approvePayment`} component={ApprovePayment}/>
                    <ProtectedRoute path={`/customer/paymentComplete`} component={PaymentComplete}/>
                    <ProtectedRoute exact path={`/merchant`} component={Merchant} />
                    <ProtectedRoute path={`/merchant/createPaymentRequest`} component={CreatePaymentRequest}/>
                    <ProtectedRoute path={`/merchant/paymentRequest`} component={GeneratedPaymentRequest}/>
                    <ProtectedRoute path={`/merchant/paymentComplete`} component={PaymentComplete}/>
                    <ProtectedRoute path={`/`} render={() => <Redirect to={`/login`} />}/>
                </Switch>
            </div>
        </div>
    </div>);
};



const NavRoot= withRouter(connect(
    (state) => ({role: state.user.role}),
    dispatch => ({setTheme: theme => dispatch(setBank(theme))})
) (NavRootW));


class App extends Component {
    render() {
        return (
            <Route path={ `/` } render={ props => <NavRoot { ...props } /> }/>
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.user.role
});

export default withRouter(connect(mapStateToProps) (App));
