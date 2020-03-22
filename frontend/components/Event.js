import React from 'react';
import { connect } from 'react-redux';
// Services
import { festivalDetails } from '../services/events';
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
    const festivalID = props.match.params.id;
    const accessToken = props.access_token;

    if (!!accessToken) this.loadFestival(festivalID, accessToken);
  }

  // Necessary if a user refreshes the page or navigates to it directly from the browser.
  componentWillReceiveProps(nextProps) {
    const festivalID = nextProps.match.params.id;
    const accessToken = nextProps.access_token;
    this.loadFestival(festivalID, accessToken);
  }

  getGenreGroups(artistList) {
    const genreGroups = {};
    // The minimum amount of artists required to display a genre group.
    const artistGenreMin = 2;
    // TODO: there has got to be a more efficient way to do this
    artistList.forEach((artist, artistIndex) => {
      if (!!artist.genres)
        artist.genres.forEach(genre => {
          if (!genreGroups[genre]) genreGroups[genre] = [];
          genreGroups[genre].push(artistIndex);
        });
    });

    for (let [genre, artists] of Object.entries(genreGroups)) {
      if (artists.length < artistGenreMin) delete genreGroups[genre];
    }

    return genreGroups;
  }

  getDisplayedArtists(genreGroups, genre) {
    if (genre === 'all genres') return this.state.artist_data;

    const artistList = this.state.artist_data;
    const displayedArtists = [];
    const artistIndexes = genreGroups[genre];
    artistIndexes.forEach(artistIndex => {
      displayedArtists.push(artistList[artistIndex]);
    });

    return displayedArtists;
  }

  loadFestival(festivalID, accessToken) {
    console.log('Loading festival..');
    const genreGroupsFunc = this.getGenreGroups;
    festivalDetails(festivalID, accessToken)
      .then(response => {
        const data = response.data;
        // TODO: Find a more elegant way to deal with this reload..
        console.log({ artist_data: data.artist_data });
        if (!!data.has_new_access_token) window.location.reload();
        const artist_data = this.sortArtists(data.artist_data);
        const genreGroups = genreGroupsFunc(data.artist_data);
        this.setState(
          {
            artist_data,
            festival_data: data.festival_data,
            displayedArtists: data.artist_data,
            genreGroups,
            loading: false
          },
          () => {}
        );
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

  // TODO: Make better sorting algorithm. Uses trash tier bubblesort right now.
  sortFilters(genreGroups) {
    const sortedFilters = [];
    const returnedFilters = [];
    for (let [genre, artistArray] of Object.entries(genreGroups)) {
      sortedFilters.push({ genre, artistLength: artistArray.length });
    }

    for (let ii = 0; ii < sortedFilters.length; ii++) {
      for (let jj = ii + 1; jj < sortedFilters.length; jj++) {
        if (sortedFilters[ii].artistLength < sortedFilters[jj].artistLength) {
          const temp = sortedFilters[ii];
          sortedFilters[ii] = sortedFilters[jj];
          sortedFilters[jj] = temp;
        }
      }
    }

    for (let filterIndex in sortedFilters) {
      returnedFilters.push(sortedFilters[filterIndex].genre);
    }

    return returnedFilters;
  }

  sortArtists(artistData) {
    for (let ii = 0; ii < artistData.length; ii++) {
      for (let jj = ii + 1; jj < artistData.length; jj++) {
        if (artistData[ii].followers < artistData[jj].followers) {
          const temp = artistData[ii];
          artistData[ii] = artistData[jj];
          artistData[jj] = temp;
        }
      }
    }

    return artistData;
  }

  modalFilterMarkup(genreGroups) {
    const genres = this.sortFilters(genreGroups);

    return (
      <div>
        <div className="all-artists">
          <button
            className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom uk-modal-close"
            onClick={() => {
              this.onClickGenreFilter('all genres');
            }}
          >
            All Genres
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
            <h1 className="white-text">{festivalData.displayName}</h1>
            <h2 className="white-text ">
              {startDate} - {endDate}
            </h2>
            <div
              className="Event-Header-Actions uk-text-center header-section"
              uk-grid=""
            >
              <div>
                <a href={festivalData.uri} target="_blank">
                  <button className="uk-button uk-button-secondary buy-tickets-btn">
                    Buy Tickets
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="Event-Body-Container">
          <div className="Event-Body">
            <div className="Event-Body-Header">
              <a href="#modal-overflow" uk-toggle="">
                <div uk-grid="">
                  <i class="uk-icon-filter"></i>
                  <h1 className="white-text genre-heading">
                    <span>{titleCase(this.state.currentFilter)}</span>
                  </h1>
                </div>
              </a>
              <div className="Event-Header-Playlist">
                <GeneratePlaylist
                  eventName={`${titleCase(this.state.currentFilter)} at ${
                    festivalData.displayName
                  }`}
                  lineupArray={artistData.map(artist => {
                    return artist.spotify_id;
                  })}
                />
              </div>
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
              {this.modalFilterMarkup(this.state.genreGroups)}
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
            <h1 className="uk-heading-small uk-heading-center">
              If it's taking a bit to load sit tight..
              <br />
              The server's busy loading artist data from spotify.
            </h1>

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
