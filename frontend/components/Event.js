import React from 'react';
import { connect } from 'react-redux';
// Services
import { festivalDetails } from '../services/events';
import { getArtistsYouFollow } from '../services/spotify';
import moment from 'moment';
// Components
import CardView from './CardView';
import GeneratePlaylist from './GeneratePlaylist';
import Loading from './Loading';
import Attribution from './Attribution';

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followedArtists: [],
      loading: true
    };

    const festivalID = props.computedMatch.params.id;
    const accessToken = props.access_token;
    if (!!accessToken) this.loadFestival(festivalID, accessToken);
  }

  // Necessary if a user refreshes the page or navigates to it directly from the browser.
  componentWillReceiveProps(nextProps) {
    const festivalID = nextProps.computedMatch.params.id;
    const accessToken = nextProps.access_token;
    this.loadFestival(festivalID, accessToken);
  }

  loadFestival(festivalID, accessToken) {
    festivalDetails(festivalID, accessToken)
      .then(response => {
        const data = response.data;
        this.setState(
          {
            artist_data: data.artist_data,
            festival_data: data.festival_data,
            loading: false
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(e => {});
  }

  generateFestivalMarkup(festivalData) {
    const startDate = moment(festivalData.start.date).format('MMM Do YYYY');
    const endDate = moment(festivalData.end.date).format('MMM Do YYYY');

    return (
      <div className="Event">
        <div className="Event-Header-Container">
          <div className="Event-Header">
            <h1>{festivalData.displayName}</h1>
            <h2>
              {startDate} - {endDate}
            </h2>
            <div
              className="Event-Header-Actions uk-text-center header-section"
              uk-grid=""
            >
              <div>
                <button className="uk-button uk-button-primary follow-btn">
                  Follow
                </button>
              </div>
              <div>
                <button className="uk-button uk-button-secondary buy-tickets-btn">
                  Buy Tickets
                </button>
              </div>
            </div>
            <div className="Event-Header-Filter header-section">
              <button className="uk-button uk-button-default filter-btn">
                Filter
              </button>
            </div>
            <div className="Event-Header-Playlist header-section">
              <button className="uk-button uk-button-secondary make-playlist-btn">
                Make Playlist
              </button>
            </div>
          </div>
        </div>
        <div className="Event-Body-Container">
          <div className="Event-Body">
            <h1>Cards</h1>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section className="Event-container" component="Event">
        {this.state.loading ? (
          <div className="festival-page-loader">
            <Loading />
          </div>
        ) : (
          <span />
        )}

        {this.state.festival_data ? (
          this.generateFestivalMarkup(this.state.festival_data)
        ) : (
          <span />
        )}
        <Attribution />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { access_token: state.auth.access_token };
};

export default connect(mapStateToProps)(Event);
