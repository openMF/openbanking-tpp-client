import {DateTime} from "luxon";
import React, {Component} from "react";
import {Button, Card, Icon, Input} from "react-onsenui";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import ErrorDialog from "../../../components/ErrorDialog/ErrorDialog";
import Layout from "../../../components/Layout/Layout";
import Loading from "../../../components/Loading/Loading";
import {clearError} from "../../../store/account/actions";
import {getAccount, getTransactions} from "../../../store/account/thunks";
import "./Account.scss";

class Account extends Component {
    state = {
        bankId: null,
        accountId: null,
        fromDate: DateTime.local().startOf('month'),
        toDate: DateTime.local()
    };

    dateOptions = {includeOffset: false, suppressMilliseconds: true};

    componentDidMount() {
        const {getAccount, match, location} = this.props;
        const params = new URLSearchParams(location.search);
        const bankId = params.get("bankId");
        const accountId = match.params.accountId;

        getAccount(accountId, bankId, {
            from: this.state.fromDate.toISO(this.dateOptions),
            to: this.state.toDate.toISO(this.dateOptions)
        });
        this.setState({...this.state, bankId, accountId})
    }

    render() {
        const {account, loading, error, transactionsLoading, transactions} = this.props;
        const accountAvailable = !loading && account;
        const transactionsAvailable = !transactionsLoading && transactions;
        return (
            <Layout>
                <div>
                    <div className="account-header">
                        <NavLink to="/customer/accounts" className="back">
                            <Icon size={30} className="fa-angle-left"/>
                        </NavLink>
                        <h2>Account details</h2>
                        <NavLink
                            to={`/customer/createPaymentRequest/${this.state.accountId}?bankId=${this.state.bankId}`}>
                            <Button>Create payment</Button>
                        </NavLink>
                    </div>
                    {accountAvailable && (
                        <Card>
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
                        </Card>)}
                    <Card>
                        <h2>Transactions</h2>
                        <div className={"filters"}>
                            <Input id="fromDate"
                                   type="date"
                                   value={this.state.fromDate.toISODate()}
                                   onChange={event => this.setState({fromDate: DateTime.fromISO(event.target.value)})}
                                   placeholder="From"
                                   modifier='material'
                                   float={true}
                            />
                            <Input
                                id="toDate"
                                type="date"
                                value={this.state.toDate.toISODate()}
                                onChange={event => this.setState({toDate: DateTime.fromISO(event.target.value)})}
                                placeholder='To'
                                modifier='material'
                                float={true}
                            />
                            <Button onClick={() => {
                                this.props.getTransactions(
                                    this.state.accountId,
                                    this.state.bankId,
                                    {
                                        from: this.state.fromDate.toISO(this.dateOptions),
                                        to: this.state.toDate.toISO(this.dateOptions)
                                    }
                                )
                            }}>Fetch</Button>
                        </div>
                        {transactionsAvailable && (
                            <table>
                                <thead>
                                <tr>
                                    <th>Transaction</th>
                                    <th>Dates (book, value)</th>
                                    <th>Status</th>
                                    <th>Information</th>
                                    <th className='align-right'>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.transactionId}>
                                        <td>
                                            {transaction.transactionId}<br/>
                                        </td>
                                        <td>
                                            {new Date(transaction.bookingDateTime).toLocaleDateString()}<br/>
                                            {new Date(transaction.valueDateTime).toLocaleDateString()}
                                        </td>
                                        <td>{transaction.status}</td>
                                        <td className='align-left'>{transaction.transactionInformation}</td>
                                        <td className='align-right'><span
                                            className={transaction.creditDebitIndicator === 'Credit' ? 'credit' : 'debit'}>
                                                    {transaction.amount.amount}</span> {transaction.amount.currency}
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        )}
                    </Card>
                </div>
                <Loading isOpen={loading || transactionsLoading}/>
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
    error: state.accounts.error,
    transactionsLoading: state.accounts.transactionsLoading,
    transactions: state.accounts.transactions
});

const mapDispatchToProps = dispatch => ({
    getAccount: (accountId, bankId, period) => dispatch(getAccount(accountId, bankId, period)),
    getTransactions: (accountId, bankId, period) => dispatch(getTransactions(accountId, bankId, period)),
    clearError: () => dispatch(clearError())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Account));
