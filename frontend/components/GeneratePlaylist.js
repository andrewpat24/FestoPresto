import React from 'react';
import { connect } from 'react-redux';
// Services
import { generatePlaylist } from '../services/spotify';
// Components
import Loading from './Loading';

export class GeneratePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  loadingBackground() {
    let cssClasses = 'loading-background-container';
    if (!this.state.loading) cssClasses += ' hide-background';
    console.log(cssClasses);
    return (
      <div className={cssClasses}>
        <Loading center={true} />
      </div>
    );
  }

  render() {
    return (
      <div className="Generate-Playlist">
        <button
          className="loading-modal uk-button uk-button-secondary make-playlist-btn"
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
                this.setState(
                  {
                    loading: false
                  },
                  () => {}
                );
              }
            );
          }}
        >
          Make Playlist{' '}
        </button>

        {this.loadingBackground()}
      </div>
    );
  }
}

// {this.state.loading ? (
//   <span className="loading-spinner-spacer">
//     <span className="playlist-loading-spinner" uk-spinner="" />
//   </span>
// ) : (
//   ''
// )}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    access_token: state.auth.access_token
  };
};

export default connect(mapStateToProps)(GeneratePlaylist);
