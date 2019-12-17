import React from "react";
import { connect } from "react-redux";

import { generatePlaylist } from "../services/spotify";

const accessToken = "";

export const GeneratePlaylist = props => {
  console.log("generatePlaylist uid:", props.uid);
  return (
    <div className="Generate-Playlist-Container">
      <button
        className="uk-button uk-button-primary"
        onClick={async () => {
          const response = await generatePlaylist(
            // accessToken is currently hardcoded.
            // TODO: add accessToken to getUser stuff
            accessToken,
            props.uid,
            props.lineupArray,
            `Top Five ${props.eventName}`
          );

          console.log(response);
        }}
      >
        Make Playlist
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid
  };
};

export default connect(mapStateToProps)(GeneratePlaylist);
