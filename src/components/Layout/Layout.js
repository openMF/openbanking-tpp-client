import React, {PureComponent} from 'react';
import { ToolbarButton, Page, Toolbar, Card } from "react-onsenui";
import { connect } from 'react-redux';
import { logout } from '../../store/users/thunks';
import { NavLink, withRouter } from 'react-router-dom';

class Layout extends PureComponent {

    render() {
        const {role, username, logout, history} = this.props;
        const isCustomer = role==='customer';
        const isMerchant = role==='merchant';

        return (<Page renderToolbar={() => <Toolbar modifier={'material'}>

            <div className="center">{role?`Welcome ${ username } (${isCustomer?'C':'M'})`: 'You are not logged in.'}</div>
            {role&&<div className="right">
                <NavLink to={`/${this.props.match.params.colorTheme}/${role}`}><ToolbarButton modifier={'material'}>My Profile</ToolbarButton></NavLink>
                {isCustomer&&<NavLink to={`/${this.props.match.params.colorTheme}/${role}/readPaymentRequest`}><ToolbarButton modifier={'material'}>Pay Order</ToolbarButton></NavLink>}
                {isMerchant&&<NavLink to={`/${this.props.match.params.colorTheme}/${role}/createPaymentRequest`}><ToolbarButton modifier={'material'}>Prepare Order</ToolbarButton></NavLink>}
                <ToolbarButton onClick={()=>logout(history, this.props.match.params.colorTheme)} modifier={'material'}>Logout</ToolbarButton>
            </div>}

        </Toolbar>}
                      contentStyle={{padding: 20}}>
            <Card modifier={'material'} style={{  textAlign: 'center'}}>
            {this.props.children}
            </Card>
        </Page>)
    }

}

export default withRouter(connect(state=>({username: state.user.username, role: state.user.role}),dispatch=>({logout:(history, theme)=>dispatch(logout(history, theme))}))(Layout));
