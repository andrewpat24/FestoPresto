import React from 'react';
import { connect } from 'react-redux';
// Services
import { festivalDetails } from '../services/events';
import { getArtistsYouFollow } from '../services/spotify';
import { titleCase } from '../services/stringManipulation';
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
      displayedArtists: [],
      filter: '',
      loading: true,
      currentFilter: 'All Genres'
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

  getGenreGroups(artistList) {
    const genreGroups = {};
    // TODO: there has got to be a more efficient way to do this
    artistList.forEach((artist, artistIndex) => {
      artist.genres.forEach(genre => {
        if (!genreGroups[genre]) genreGroups[genre] = [];
        genreGroups[genre].push(artistIndex);
      });
    });

    // console.log(genreGroups);
    return genreGroups;
  }

  getDisplayedArtists(genreGroups, genre) {
    if (genre === 'all-artists') return this.state.artist_data;

    const artistList = this.state.artist_data;
    const displayedArtists = [];
    const artistIndexes = genreGroups[genre];
    artistIndexes.forEach(artistIndex => {
      displayedArtists.push(artistList[artistIndex]);
    });

    return displayedArtists;
  }

  loadFestival(festivalID, accessToken) {
    festivalDetails(festivalID, accessToken)
      .then(response => {
        const data = response.data;
        // TODO: Find a more elegant way to deal with this reload..
        if (!!data.has_new_access_token) window.location.reload();
        const genreGroups = this.getGenreGroups(data.artist_data);

        this.setState({
          artist_data: data.artist_data,
          festival_data: data.festival_data,
          displayedArtists: data.artist_data,
          genreGroups,
          loading: false
        });
      })
      .catch(e => {});
  }

  onClickGenreFilter(genre) {
    const displayedArtists = this.getDisplayedArtists(
      this.state.genreGroups,
      genre
    );

    this.setState({
      displayedArtists,
      currentFilter: genre
    });
  }

  modalBodyMarkup(genreGroups) {
    const genres = Object.keys(genreGroups);
    return (
      <div>
        <div className="all-artists">
          <button
            className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom uk-modal-close"
            onClick={() => {
              this.onClickGenreFilter('all-artists');
            }}
          >
            All Artists
          </button>
        </div>
        <div
          className="uk-child-width-1-3@m uk-child-width-1-4@s uk-grid-small uk-grid-match uk-grid"
          uk-grid=""
        >
          {genres.map(genre => {
            return (
              <div key={genre}>
                <button
                  className="uk-button uk-button-default uk-button-small uk-modal-close"
                  onClick={() => {
                    this.onClickGenreFilter(genre);
                  }}
                >
                  {genre}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  generateFestivalMarkup(festivalData, artistData) {
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
                <a href={festivalData.uri} target="_blank">
                  <button className="uk-button uk-button-secondary buy-tickets-btn">
                    Buy Tickets
                  </button>
                </a>
              </div>
            </div>
            <div className="Event-Header-Filter header-section">
              <a
                className="uk-button uk-button-default"
                href="#modal-overflow"
                uk-toggle=""
              >
                Filter
              </a>
            </div>
            <div className="Event-Header-Playlist header-section">
              <GeneratePlaylist
                eventName={`${this.state.currentFilter} at ${festivalData.displayName}`}
                lineupArray={artistData.map(artist => {
                  return artist.spotify_id;
                })}
              />
            </div>
          </div>
        </div>
        <div className="Event-Body-Container">
          <div className="Event-Body">
            <div className="Event-Body-Header">
              <h1 className="uk-heading-small uk-heading-line uk-text-center">
                <span>{titleCase(this.state.currentFilter)}</span>
              </h1>
            </div>
            <CardView
              cardType="artist"
              colWidth="4"
              cards={artistData}
              section="festival-lineup"
            />
          </div>
        </div>
        {/** Turn this modal code + button into its own component */}
        <div id="modal-overflow" uk-modal="">
          <div className="uk-modal-dialog">
            <button
              className="uk-modal-close-default"
              type="button"
              uk-close=""
            ></button>

            <div className="uk-modal-header">
              <h2 className="uk-modal-title">Pick a genre</h2>
            </div>

            <div className="uk-modal-body" uk-overflow-auto="">
              {this.modalBodyMarkup(this.state.genreGroups)}
            </div>
          </div>
        </div>
        {/** */}
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
          this.generateFestivalMarkup(
            this.state.festival_data,
            this.state.displayedArtists
          )
        ) : (
          <span />
        )}
        <Attribution />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { access_token: state.auth.access_token, spotify_uid: state.auth.uid };
};

export default connect(mapStateToProps)(Event);
