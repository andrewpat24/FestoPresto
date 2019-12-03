import React from "react";
import { connect } from "react-redux";
import { startLogin, logout } from "../actions/auth";

export const Login = ({ startLogin, logout }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Festivus</h1>
      <p>Find your vibe.</p>
      <button className=" btn md blue-bg" onClick={startLogin}>
        Login with Spotify
      </button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Login);
