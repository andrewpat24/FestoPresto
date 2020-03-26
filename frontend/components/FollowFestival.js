import React from 'react';
import { connect } from 'react-redux';
// Services
import { followFestivalAction } from '../services/events';

export class FollowFestival extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      followStatus: this.props.followStatus
    };
  }

  onClickFollow = async () => {
    if (this.state.loading) return;

    const data = {
      numPerformers: this.props.numPerformers,
      start: this.props.start,
      displayName: this.props.displayName
    };
    this.setState(
      {
        loading: true
      },
      async () => {
        const follow_type = 'festival';
        const response = await followFestivalAction(
          this.props.songkick_id,
          this.props.uid,
          this.props.email,
          follow_type,
          data
        );
        this.setState({
          loading: false,
          followStatus: response.data.follow_status
        });
      }
    );
  };

  render() {
    const followStatusCSSRule = this.state.followStatus
      ? 'uk-button uk-button-danger danger-red-background'
      : 'uk-button uk-button-secondary';
    return (
      <div className="Follow-Festival">
        <button className={followStatusCSSRule} onClick={this.onClickFollow}>
          {this.state.followStatus ? 'Unfollow' : 'Follow'}
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
    email: state.auth.email
  };
};

export default connect(mapStateToProps)(FollowFestival);
