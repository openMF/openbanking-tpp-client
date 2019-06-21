import React, { Component } from "react";
import { connect } from "react-redux";
import UUID from "uuid/v1.js";
import {
  List,
  ListItem,
  ListHeader,
  AlertDialog,
  Button,
  Dialog,
  ProgressCircular
} from "react-onsenui";
import "./BankList.scss";
import { getBankList, addNewBank } from "../../../store/bank/thunks";
import { addNewBankCleared } from "../../../store/bank/actions";
import Layout from "../../../components/Layout/Layout";

class BankList extends Component {
  componentDidMount() {
    this.props.getBankList();
  }

  addNewBank = bank => {
    this.props.addNewBank(bank);
  };

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

        <AlertDialog isOpen={this.props.bankAlreadyRegistered}>
          <div className="alert-dialog-title">Warning!</div>
          <div className="alert-dialog-content">
            This bank is already registered!
          </div>
          <div className="alert-dialog-footer">
            <Button
              onClick={this.props.closeAlert.bind(this)}
              className="alert-dialog-button"
            >
              Ok
            </Button>
          </div>
        </AlertDialog>

        <Dialog isOpen={this.props.loading}>
          <ProgressCircular indeterminate />
        </Dialog>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  bankList: state.bank.bankList,
  loading: state.bank.loading,
  bankAlreadyRegistered: state.bank.bankAlreadyRegistered
});

const mapDispatchToProps = dispatch => ({
  getBankList: () => dispatch(getBankList()),
  addNewBank: bank => dispatch(addNewBank(bank)),
  closeAlert: () => dispatch(addNewBankCleared())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankList);
