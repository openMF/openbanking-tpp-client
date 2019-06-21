import React, { Component } from "react";
import { connect } from "react-redux";
import "./Accounts.scss";
import UUID from "uuid/v1.js";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListHeader, Button } from "react-onsenui";
import Layout from "../../../components/Layout/Layout";
import { getAccounts } from "../../../store/account/thunks";

class Accounts extends Component {
  componentDidMount() {
    const { connectedBanks, getAccounts } = this.props;
    getAccounts(connectedBanks);
  }

  getBank = bankId => {
    const { connectedBanks } = this.props;
    return connectedBanks.find(b=>b.bankId === bankId);
  }

  render() {
    const { accounts } = this.props;
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
            <NavLink to={`/customer/accounts/${row.accountId}`} key={UUID()}>
              <ListItem modifier="chevron" tappable className="account-item">
                <div className="left">
                  <img
                    class="list-item__thumbnail"
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
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  connectedBanks: state.bank.connectedBanks
});

const mapDispatchToProps = dispatch => ({
  getAccounts: bankIds => dispatch(getAccounts(bankIds))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
