import React, { Component } from 'react';
import {Route} from "react-router-dom";
import './App.css';
import Customer from "./screens/customer/";
import Merchant from "./screens/merchant";
import Login from "./screens/login"

class App extends Component {
  render() {
      return (
      <div className="App">
        <div>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/customer" component={Customer} />
            <Route path="/merchant" component={Merchant} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
