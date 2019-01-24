import React, { Component } from 'react';
import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';
import Customer from "./screens/customer";
import Merchant from "./screens/merchant";
import Login from "./screens/login";

class App extends Component {
  render() {
      const {role} = this.props;
      return (
      <div className="App">
        <div>
          <div>
              <Route exact path="/" render={
                  () => !role ?
                      <Login/> :
                      <Redirect to={`/${role}`}/>
              }/>
              {this.props.role === "customer" ?
                  <Route path="/customer" component={Customer} /> :
                  <Route path="/merchant" component={Merchant} />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
   role: state.user.role
});

export default connect(mapStateToProps) (App);
