import React from 'react';
import { connect } from 'react-redux';
// Services
import {
  refreshAccessToken,
  refreshFollowedArtists
} from '../services/spotify';

export const Profile = ({ spotify_uid, access_token }) => (
  <div section="profile" className="profile-container">
    <div className="uk-heading-small uk-text-center">Profile</div>
    <div>
      <button
        className="uk-button uk-button-danger uk-button-large uk-align-right"
        onClick={() => {
          refreshFollowedArtists(spotify_uid, access_token);
        }}
      >
        Refresh Followed Artists
      </button>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    spotify_uid: state.auth.uid,
    access_token: state.auth.access_token
  };
};

export default connect(mapStateToProps)(Profile);
