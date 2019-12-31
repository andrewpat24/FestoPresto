import React from "react";
import { connect } from "react-redux";
// Services
import { generatePlaylist } from "../services/spotify";

export const GeneratePlaylist = props => {
  return (
    <div className="Generate-Playlist-Container">
      <button
        className="uk-button uk-button-primary"
        onClick={async () => {
          const response = await generatePlaylist(
            props.access_token,
            props.uid,
            props.lineupArray,
            `Top Five ${props.eventName}`
          );

          const hasNewAccessToken = response.data.has_new_access_token;
          if (hasNewAccessToken) window.location.reload();
        }}
      >
        Make Playlist
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    access_token: state.auth.access_token
  };
};

export default connect(mapStateToProps)(GeneratePlaylist);
