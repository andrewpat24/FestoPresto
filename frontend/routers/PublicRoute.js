import React from "react";
import { Route } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => <Route {...rest} component={() => <Component {...rest} />} />;

export default PublicRoute;
