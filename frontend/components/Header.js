import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../actions/auth";

export const Header = ({ logout, isAuthenticated }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>Festivus</h1>
        </Link>
        {isAuthenticated ? (
          <button className="btn transparent-bg md" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link className="btn transparent-bg md" to="/login">
            Login
          </Link>
        )}
        <Link className="btn transparent-bg md" to="/search">
          Search
        </Link>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.uid
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
