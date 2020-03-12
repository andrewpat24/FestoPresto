import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// Components

export const PrivateRoute = ({
  isAuthenticated,
  uid,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated || uid === undefined ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { redirect: rest.location.pathname }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  uid: state.auth.uid,
  isAuthenticated: state.auth.uid !== 'logged out'
});

export default connect(mapStateToProps)(PrivateRoute);
