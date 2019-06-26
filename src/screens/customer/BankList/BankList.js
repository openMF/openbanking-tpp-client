import React, { Component } from "react";
import { connect } from "react-redux";
import UUID from "uuid/v1.js";
import { List, ListItem, ListHeader, AlertDialog, Button } from "react-onsenui";
import "./BankList.scss";
import { getBankList, addNewBank } from "../../../store/bank/thunks";
import { addNewBankCleared, clearError } from "../../../store/bank/actions";
import Layout from "../../../components/Layout/Layout";
import Loading from "../../../components/Loading/Loading";
import ErrorDialog from "../../../components/ErrorDialog/ErrorDialog";

class BankList extends Component {
  componentDidMount() {
    this.props.getBankList();
  }

  addNewBank = bank => {
    this.props.addNewBank(bank);
  };

  render() {
    const { bankList, error } = this.props;
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
  bankList: state.bank.bankList,
  loading: state.bank.loading,
  error: state.bank.error,
  bankAlreadyRegistered: state.bank.bankAlreadyRegistered
});

const mapDispatchToProps = dispatch => ({
  getBankList: () => dispatch(getBankList()),
  addNewBank: bank => dispatch(addNewBank(bank)),
  closeAlert: () => dispatch(addNewBankCleared()),
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankList);
