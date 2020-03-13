import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

export const Header = ({ logout, isAuthenticated }) => (
  <header className="header">
    <nav className="uk-navbar-container uk-margin" uk-navbar="true">
      <div className="uk-navbar-center">
        <div className="uk-navbar-center-left">
          <div>
            <ul className="uk-navbar-nav">
              <li>
                <Link className="nav-sub-item" to="/search">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Link className="uk-navbar-item uk-logo" to="/">
          Festivus
        </Link>
        <div className="uk-navbar-center-right">
          <div>
            <ul className="uk-navbar-nav">
              <li>
                {isAuthenticated ? (
                  <a className="nav-sub-item" href="#" onClick={logout}>
                    Logout
                  </a>
                ) : (
                  <Link className="nav-sub-item" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.uid !== 'logged out'
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
