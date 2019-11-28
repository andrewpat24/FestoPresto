import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../actions/auth";

export const Header = ({ logout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>Festivus</h1>
        </Link>
        <button className="btn transparent-bg md" onClick={logout}>
          Logout
        </button>
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

export default connect(undefined, mapDispatchToProps)(Header);
