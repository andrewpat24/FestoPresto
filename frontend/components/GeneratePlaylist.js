import React from 'react';
import { connect } from 'react-redux';
// Services
import { generatePlaylist } from '../services/spotify';

export class GeneratePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <div className="Generate-Playlist">
        <button
          className="uk-button uk-button-secondary make-playlist-btn"
          onClick={async () => {
            if (this.state.loading) return;
            this.setState(
              {
                loading: true
              },
              async () => {
                const response = await generatePlaylist(
                  this.props.access_token,
                  this.props.uid,
                  this.props.lineupArray,
                  `${this.props.eventName}`
                );
                const hasNewAccessToken = response.data.has_new_access_token;
                if (hasNewAccessToken) window.location.reload();

                this.setState({
                  loading: false
                });
              }
            );
          }}
        >
          Make Playlist{' '}
          {this.state.loading ? (
            <span className="loading-spinner-spacer">
              <span className="playlist-loading-spinner" uk-spinner="" />
            </span>
          ) : (
            <span />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    access_token: state.auth.access_token
  };
};

export default connect(mapStateToProps)(GeneratePlaylist);
