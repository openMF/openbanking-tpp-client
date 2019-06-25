import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends React.PureComponent {
  render() {
    const { role, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          role ? <Component {...props} /> : <Redirect to={`/login`} />
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  role: state.user.role
});

export default withRouter(
  connect(
    mapStateToProps
  )(ProtectedRoute)
);
