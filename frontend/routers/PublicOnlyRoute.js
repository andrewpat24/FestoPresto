import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicOnlyRoute = ({
  isAuthenticated,
  uid,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={() =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...rest} />
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.uid !== "logged out",
    uid: state.auth.uid
  };
};

export default connect(mapStateToProps)(PublicOnlyRoute);
