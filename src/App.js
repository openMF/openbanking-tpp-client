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
import './green-gold.scss';
import './gold-red.scss';


const NavRootW = (props) => (<div className={`App ${props.match.params.colorTheme}`}>
    <div>
        <div>
            <Switch>
                <Route path={`/:colorTheme/login`} component={Login} />

                <Route exact path={`/:colorTheme`} render={
                    (propsInner) => !props.role ?
                        <Redirect to={`/${propsInner.match.params.colorTheme}/login`} /> :
                        <Redirect to={
                            props.role==='customer'
                                    ?`/${propsInner.match.params.colorTheme}/customer/readPaymentRequest`:
                                    `/${propsInner.match.params.colorTheme}/merchant/createPaymentRequest`
                            }
                    />
                }/>
                <Route exact path={`/:colorTheme/customer`} component={Customer} />
                <Route path={`/:colorTheme/customer/readPaymentRequest`} component={ReadPaymentRequest}/>
                <Route path={`/:colorTheme/customer/approvePayment`} component={ApprovePayment}/>
                <Route path={`/:colorTheme/customer/paymentComplete`} component={PaymentComplete}/>
                <Route exact path={`/:colorTheme/merchant`} component={Merchant} />
                <Route path={`/:colorTheme/merchant/createPaymentRequest`} component={CreatePaymentRequest}/>
                <Route path={`/:colorTheme/merchant/paymentRequest`} component={GeneratedPaymentRequest}/>
                <Route path={`/:colorTheme/merchant/paymentComplete`} component={PaymentComplete}/>
                <Route path={`/:colorTheme`} render={propsInner=> <Redirect to={`/${propsInner.match.params.colorTheme}/login`} />}/>
            </Switch>
        </div>
    </div>
</div>);



const NavRoot= withRouter(connect((state) => ({role: state.user.role})) (NavRootW));


class App extends Component {
    render() {
        return (
            <Route path={ `/:colorTheme(lionbank|buffalobank)` } render={ props => <NavRoot { ...props } /> }/>
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.user.role
});

export default withRouter(connect(mapStateToProps) (App));
