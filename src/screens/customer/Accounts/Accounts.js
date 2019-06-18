import React, { Component } from "react";
import { connect } from "react-redux";
import "./Accounts.scss";
import UUID from "uuid/v1.js";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListHeader } from "react-onsenui";
import Layout from "../../../components/Layout/Layout";
import { getAccounts } from "../../../store/account/thunks";

class Accounts extends Component {
  componentDidMount() {
    this.props.getAccounts();
  }

  render() {
    const { accounts } = this.props;
    return (
      <Layout placeContentInCard={false}>
        <List
          renderHeader={() => (
            <ListHeader style={{ fontSize: 18 }} className="account-title">
              {" "}
              Accounts{" "}
            </ListHeader>
          )}
          dataSource={accounts}
          renderRow={row => (
            <NavLink to={`/customer/accounts/${row.accountId}`}>
              <ListItem
                modifier="chevron"
                tappable
                className="account-item"
                key={UUID()}
              >
                <div className="left">{row.nickname}</div>
                <div className="center account-credit-indicator">
                  {row.balance.creditDebitIndicator}
                </div>
                <div className="right">
                  {`${row.balance.amount.amount} ${row.currency}`}
                </div>
              </ListItem>
            </NavLink>
          )}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

const mapDispatchToProps = dispatch => ({
  getAccounts: () => dispatch(getAccounts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
