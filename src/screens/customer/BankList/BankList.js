import React, { Component } from "react";
import { connect } from "react-redux";
import UUID from "uuid/v1.js";
import { List, ListItem, ListHeader } from "react-onsenui";
import './BankList.scss';
import { getBankList } from "../../../store/bank/thunks";
import Layout from "../../../components/Layout/Layout";

class BankList extends Component {
  componentDidMount() {
    this.props.getBankList();
  }

  render() {
    const { bankList } = this.props;
    return (
      <Layout placeContentInCard={false}>
        <List
          renderHeader={() => (
            <ListHeader style={{ fontSize: 18 }} className="bank-list-title">
              Supported Banks
            </ListHeader>
          )}
          dataSource={bankList}
          renderRow={row => (
            <ListItem
              modifier="material"
              tappable
              className="bank-list-item"
              key={UUID()}
            >
              <div className="left">
                <img
                  class="list-item__thumbnail"
                  src={row.logoUrl}
                  alt={row.shortName}
                />
              </div>
              <div className="center">{row.longName}</div>
            </ListItem>
          )}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  bankList: state.bank.bankList
});

const mapDispatchToProps = dispatch => ({
  getBankList: () => dispatch(getBankList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankList);
