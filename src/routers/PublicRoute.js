import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => <Route {...rest} component={() => <Component {...rest} />} />;

// Sample code if you want mandatory auth to access app.
// <Route
//     {...rest}
//     component={() =>
//       isAuthenticated ? <Redirect to="/search" /> : <Component {...rest} />
//     }
//   />

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
