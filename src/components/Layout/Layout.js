import React, { Fragment, PureComponent } from "react";
import { ToolbarButton, Page, Toolbar, Card, Icon } from "react-onsenui";
import { connect } from "react-redux";
import { logout } from "../../store/users/thunks";
import { NavLink, withRouter } from "react-router-dom";

class Layout extends PureComponent {
  render() {
    const {
      role,
      fullname,
      logout,
      history,
      placeContentInCard = true
    } = this.props;

    return (
      <Page
        renderToolbar={() => (
          <Toolbar modifier={"material"}>
            <div className="center">
              {role ? (
                <Fragment>
                  <NavLink to={`/customer/banks`}>
                    <ToolbarButton modifier={"material"}>
                      <Icon icon="fa-user-circle" /> {fullname}
                    </ToolbarButton>
                  </NavLink>
                </Fragment>
              ) : (
                "You are not logged in."
              )}
            </div>
            {role && (
              <div className="right">
                <NavLink to={`/customer/accounts`}>
                  <ToolbarButton modifier={"material"}>
                    <Icon icon={"fa-list"} />
                  </ToolbarButton>
                </NavLink>
                <ToolbarButton
                  onClick={() => logout(history)}
                  modifier={"material"}
                >
                  <Icon icon={"fa-sign-out-alt"} />
                </ToolbarButton>
              </div>
            )}
          </Toolbar>
        )}
      >
        {placeContentInCard ? (
          <Card modifier={"material"} style={{ textAlign: "center" }}>
            {this.props.children}
          </Card>
        ) : (
          this.props.children
        )}
      </Page>
    );
  }
}

export default withRouter(
  connect(
    state => ({ fullname: state.user.fullname, role: state.user.role }),
    dispatch => ({ logout: history => dispatch(logout(history)) })
  )(Layout)
);
