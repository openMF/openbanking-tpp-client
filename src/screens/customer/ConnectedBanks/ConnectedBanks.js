import React, { Component } from "react";
import { connect } from "react-redux";
import "./ConnectedBanks.scss";
import UUID from "uuid/v1.js";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListHeader, Button } from "react-onsenui";
import Layout from "../../../components/Layout/Layout";
import { getConnectedBanks } from "../../../store/bank/thunks";

class ConnectedBanks extends Component {
  componentDidMount() {
    this.props.getConnectedBanks();
  }

  render() {
    const { connectedBanks } = this.props;
    return (
      <Layout placeContentInCard={false}>
        <List
          renderHeader={() => (
            <ListHeader style={{ fontSize: 18 }} className="bank-list-title">
              Connected Banks
            </ListHeader>
          )}
          dataSource={connectedBanks}
          renderRow={row => (
            <ListItem
              tappable
              className="bank-list-item"
              key={UUID()}
            >
              <div className="left">
                <img
                  className="list-item__thumbnail"
                  src={row.logoUrl}
                  alt={row.shortName}
                />
              </div>
              <div className="center">{row.longName}</div>
            </ListItem>
          )}
        />
        <NavLink to={`/customer/accounts/new`}>
          <Button modifier="outline" className="btn-add-account">
            Add Bank
          </Button>
        </NavLink>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
    connectedBanks: state.bank.connectedBanks
});

const mapDispatchToProps = dispatch => ({
    getConnectedBanks: () => dispatch(getConnectedBanks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedBanks);
