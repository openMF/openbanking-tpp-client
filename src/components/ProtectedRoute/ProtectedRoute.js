import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { tryLogin } from "../../store/users/thunks";

class ProtectedRoute extends React.PureComponent {
  componentDidMount() {
    if (!this.props.role) {
      this.props.tryLogin();
    }
  }

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

const mapDispatchToProps = dispatch => ({
  tryLogin: () => dispatch(tryLogin())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProtectedRoute)
);
