import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';
import Customer from "./screens/customer";
import Merchant from "./screens/merchant";
import Login from "./screens/login";
import CreatePaymentRequest from './screens/merchant/CreatePaymentRequest/CreatePaymentRequest';
import GeneratedPaymentRequest from './screens/merchant/GeneratedPaymentRequest/GeneratedPaymentRequest';
import { PaymentComplete } from './screens/merchant/PaymentComplete/PaymentComplete';
import ReadPaymentRequest from './screens/customer/ReadPaymentRequest/ReadPaymentRequest';
import ApprovePayment from './screens/customer/ApprovePayment/ApprovePayment';

class App extends Component {
  render() {
      const {role} = this.props;
      return (
      <div className="App">
        <div>
          <div>
              <Switch>
              <Route exact path="/" render={
                  (props) => !role ?
                      <Redirect to={'/login'} /> :
                      <Redirect to={role==='customer'?'/customer/readPaymentRequest':'/merchant/createPaymentRequest'}/>
              }/>

              <Route path={'/login'} component={Login} />

              <Route exact path="/customer" component={Customer} />
              <Route path={`/customer/readPaymentRequest`} component={ReadPaymentRequest}/>
              <Route path={`/customer/approvePayment`} component={ApprovePayment}/>
              <Route path={`/customer/paymentComplete`} component={PaymentComplete}/>
              <Route exact path="/merchant" component={Merchant} />
              <Route path={`/merchant/createPaymentRequest`} component={CreatePaymentRequest}/>
              <Route path={`/merchant/paymentRequest`} component={GeneratedPaymentRequest}/>
              <Route path={`/merchant/paymentComplete`} component={PaymentComplete}/>
              </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
   role: state.user.role
});

export default withRouter(connect(mapStateToProps) (App));
