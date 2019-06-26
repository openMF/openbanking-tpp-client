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
    const { getAccount, match, location } = this.props;
    const params = new URLSearchParams(location.search);
    getAccount(match.params.accountId, params.get("bankId"));
  }

  render() {
    const { account, loading, error } = this.props;
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
                <div className="title">Type:</div>
                <div>{`${account.accountType}, ${account.accountSubType}`}</div>
              </div>
              {account.balance && (
                <React.Fragment>
                  <div className="account-detail">
                    <div className="title">Category:</div>
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
                  )}{" "}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
        <Loading isOpen={this.props.loading} />
        <ErrorDialog
          isOpen={!!error}
          close={this.props.clearError}
          title="Something went wrong"
          message={error ? error.data : null}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  account: state.accounts.currentAccount,
  loading: state.accounts.loading,
  error: state.accounts.error
});

const mapDispatchToProps = dispatch => ({
  getAccount: (accountId, bankId) => dispatch(getAccount(accountId, bankId)),
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Account));
