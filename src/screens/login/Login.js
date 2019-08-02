import React, { PureComponent } from 'react'
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout/Layout.js";
import { Input, Button, Card, Icon } from 'react-onsenui';
import {connect} from 'react-redux';
import {login} from "../../store/users/thunks";

class Login extends PureComponent {

    state= {
        username: '',
        password: '',
    };

    render() {
        const {username, password} = this.state;
        const {login, error} = this.props;
        return (<Layout>
            <h1>Login</h1>
            <div>
                <Input
                    style={{marginBottom : "15px"}}
                    id={'sometweqrqwer'}
                    name={'sometweqrqwer'}
                    autoComplete={'off'}
                    value={username} float
                    onChange={(event) => { this.setState({username: event.target.value})} }
                    modifier='material'
                    placeholder='Username'
                />
            </div>
            <div>
                <Input
                    style={{marginBottom : "15px"}}
                    id={'sometasdfasdf'}
                    name={'sometasdfasdf'}
                    autoComplete={'off'}
                    value={password} float
                    onChange={(event) => { this.setState({password: event.target.value})} }
                    modifier='material'
                    placeholder='Password'
                    type="password"
                />
            </div>
            {error && <Card><p style={{color: "red"}}>{error}</p></Card>}
                <Button modifier="large--cta" onClick={() => login(btoa(`${username}:${password}`), this.props.history)}>
                <Icon icon={'fa-sign-in-alt'} /> Login
            </Button>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.username && !state.user.error,
    error: state.user.error,
    username: state.user.username,
});

const matchDispatchToProps = (dispatch) => ({
    login: (credentials, history) => dispatch(login(credentials, history))
});

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Login));
