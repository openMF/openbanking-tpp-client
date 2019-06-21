import React, { Component } from "react";
import { connect } from "react-redux";
import UUID from "uuid/v1.js";
import { List, ListItem, ListHeader } from "react-onsenui";
import './BankList.scss';
import { getBankList, addNewBank } from "../../../store/bank/thunks";
import Layout from "../../../components/Layout/Layout";

class BankList extends Component {
  componentDidMount() {
    this.props.getBankList();
  }

  addNewBank = bank => {
    this.props.addNewBank(bank);
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
              tappable
              className="bank-list-item"
              key={UUID()}
              onClick={() => this.addNewBank(row)}
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
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  bankList: state.bank.bankList
});

const mapDispatchToProps = dispatch => ({
  getBankList: () => dispatch(getBankList()),
  addNewBank: bank => dispatch(addNewBank(bank))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankList);
