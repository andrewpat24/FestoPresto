import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicOnlyRoute = ({
  isAuthenticated,
  uid,
  component: Component,
  ...rest
}) => {
  const returnRedirect = rest.location.state.redirect
    ? rest.location.state.redirect
    : '/';
  return (
    <Route
      {...rest}
      component={() =>
        isAuthenticated ? (
          <Redirect to={returnRedirect} />
        ) : (
          <Component {...rest} />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.uid !== 'logged out',
    uid: state.auth.uid
  };
};

export default connect(mapStateToProps)(PublicOnlyRoute);
