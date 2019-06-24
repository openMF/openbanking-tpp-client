import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { Icon } from "react-onsenui";
import "./Account.scss";
import Layout from "../../../components/Layout/Layout";
import { getAccount } from "../../../store/account/thunks";
import Loading from "../../../components/Loading/Loading";
import ErrorDialog from "../../../components/ErrorDialog/ErrorDialog";
import { clearError } from "../../../store/account/actions";

class Account extends Component {
  componentDidMount() {
    const { getAccount, match } = this.props;
    getAccount(match.params.accountId);
  }

  render() {
    const { account, loading } = this.props;
    return (
      <Layout>
        <div>
          <div className="account-header">
            <NavLink to="/customer/accounts" className="back">
              <Icon size={30} className="fa-angle-left" />
            </NavLink>
            <h2>Account details</h2>
          </div>
          {!loading && account && (
            <React.Fragment>
              <div className="account-detail">
                <div className="title">Nickname:</div>
                <div>{account.nickname}</div>
              </div>
              <div className="account-detail">
                <div className="title">Status:</div>
                <div>{account.status}</div>
              </div>
              <div className="account-detail">
                <div className="title">Owner:</div>
                <div>{account.account[0].name}</div>
              </div>
              <div className="account-detail">
                <div className="title">Type:</div>
                <div>{account.balance.creditDebitIndicator}</div>
              </div>
              <div className="account-detail">
                <div className="title">Amount:</div>
                <div>{`${account.balance.amount.amount} ${
                  account.balance.amount.currency
                }`}</div>
              </div>
              {account.balance.creditLine && (
                <div className="account-detail">
                  <div className="title">Credit line amount:</div>
                  <div>{`${account.balance.creditLine[0].amount.amount} ${
                    account.balance.creditLine[0].amount.currency
                  }`}</div>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        <Loading isOpen={this.props.loading} />
        <ErrorDialog isOpen={!!this.props.error} close={this.props.clearError} />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  account: state.accounts.currentAccount,
  loading: state.accounts.loading,
  error: state.accounts.error,
});

const mapDispatchToProps = dispatch => ({
  getAccount: accountId => dispatch(getAccount(accountId)),
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Account));
