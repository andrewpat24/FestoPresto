import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const Login = ({ startLogin }) => (
  <section className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Festivus</h1>
      <p>Make playlists from festival lineups</p>
      <button className=" btn md blue-bg" onClick={startLogin}>
        Login with Spotify
      </button>
    </div>
  </section>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(Login);
