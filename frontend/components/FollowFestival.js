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
    console.log('FOLLOW STATE:', this.state);
    console.log('FOLLOW PROPS:', this.props);
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
          follow_type
        );
        console.log('RESPONSE:', response.data.follow_status);
        console.log(this.state.followStatus ? 'Unfollow' : 'Follow');
        this.setState({
          loading: false,
          followStatus: response.data.follow_status
        });
      }
    );
  };

  render() {
    return (
      <div className="Follow-Festival">
        <button
          className="uk-button uk-button-secondary"
          onClick={this.onClickFollow}
        >
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
