import React, {PureComponent} from 'react';
import { ToolbarButton, Page, Toolbar } from "react-onsenui";
import { connect } from 'react-redux';
import { logout } from '../../store/users/thunks';
import { NavLink, withRouter } from 'react-router-dom';

class Layout extends PureComponent {

    render() {
        const {role, username, logout, history} = this.props;
        const isCustomer = role==='customer';
        const isMerchant = role==='merchant';

        return (<Page renderToolbar={() => <Toolbar>

            <div className="center">{role?`Welcome ${ username } (${isCustomer?'C':'M'})`: 'You are not logged in.'}</div>
            {role&&<div className="right">
                <NavLink to={`/${role}`}><ToolbarButton>My Profile</ToolbarButton></NavLink>
                {isCustomer&&<NavLink to={`/${role}/readPaymentRequest`}><ToolbarButton>Pay Order</ToolbarButton></NavLink>}
                {isMerchant&&<NavLink to={`/${role}/createPaymentRequest`}><ToolbarButton>Prepare Order</ToolbarButton></NavLink>}
                <ToolbarButton onClick={()=>logout(history)}>Logout</ToolbarButton>
            </div>}

        </Toolbar>}>
            {this.props.children}
        </Page>)
    }

}

export default withRouter(connect(state=>({username: state.user.username, role: state.user.role}),dispatch=>({logout:(history)=>dispatch(logout(history))}))(Layout));
