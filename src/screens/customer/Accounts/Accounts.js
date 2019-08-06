import React, { Component } from "react";
import { connect } from "react-redux";
import "./Accounts.scss";
import UUID from "uuid/v1.js";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListHeader, Button } from "react-onsenui";
import Layout from "../../../components/Layout/Layout";
import { getAccounts } from "../../../store/account/thunks";
import Loading from "../../../components/Loading/Loading";
import { clearError } from "../../../store/account/actions";
import ErrorDialog from "../../../components/ErrorDialog/ErrorDialog";
import { getConnectedBanks } from "../../../store/bank/thunks";

class Accounts extends Component {
  componentDidMount() {
    const { connectedBanks, getAccounts, getConnectedBanks } = this.props;
    if (!connectedBanks.length) {
      getConnectedBanks().then(banks => {
        getAccounts(banks || []);
      });
    } else {
      getAccounts(connectedBanks);
    }
  }

  getBank = bankId => {
    const { connectedBanks } = this.props;
    return connectedBanks.find(b => b.bankId === bankId);
  };

  render() {
    const { accounts, error } = this.props;
    return (
      <Layout placeContentInCard={false}>
        <List
          renderHeader={() => (
            <ListHeader style={{ fontSize: 18 }} className="account-title">
              Accounts
            </ListHeader>
          )}
          dataSource={accounts}
          renderRow={row => (
            <NavLink to={`/customer/accounts/${row.accountId}?bankId=${row.bankId}`} key={UUID()}>
              <ListItem modifier="chevron" tappable className="account-item">
                <div className="left">
                  <img
                    className="list-item__thumbnail"
                    src={this.getBank(row.bankId).logoUrl}
                    alt={this.getBank(row.bankId).shortName}
                  />
                </div>
                <div className="center">
                  <span className="list-item__title">{row.nickname}</span>
                  <span className="list-item__subtitle">
                    {row.balance.creditDebitIndicator}
                  </span>
                </div>
                <div className="right">
                  {`${row.balance.amount.amount} ${row.currency}`}
                </div>
              </ListItem>
            </NavLink>
          )}
        />
        <NavLink to={`/customer/accounts/new`}>
          <Button modifier="outline" className="btn-add-account">
            Add Account
          </Button>
        </NavLink>

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
  accounts: state.accounts.accounts,
  loading: state.accounts.loading,
  error: state.accounts.error,
  connectedBanks: state.bank.connectedBanks
});

const mapDispatchToProps = dispatch => ({
  getAccounts: bankIds => dispatch(getAccounts(bankIds)),
  getConnectedBanks: () => dispatch(getConnectedBanks()),
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
