import React from 'react';
// Components
import CardView from './CardView';
import Loading from './Loading';
import Attribution from './Attribution';
// Services
import { findFestivals, getTopFourFestivals } from '../services/events';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      ...props,
      searchValue: '',
      loading: false
    };
  }

  componentDidMount() {
    this.loadTopFourFestivals();
  }

  async findFestivals(filter = {}) {
    const festivals = await findFestivals(filter);
    return festivals.data;
  }

  onFormSubmit(e) {
    e.preventDefault();
    const searchQuery = this.state.searchValue;

    this.setState(
      {
        festivals: [],
        location_name: '',
        loading: true
      },
      () => {
        this.findFestivals({ location: searchQuery }).then(locationData => {
          this.setState(
            {
              location_name: locationData.location_name,
              festivals: locationData.festivals,
              loading: false
            },
            () => {}
          );
        });
      }
    );
  }

  onChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  loadTopFourFestivals = async () => {
    this.setState(
      {
        loading: true
      },
      async () => {
        const response_topFour = await getTopFourFestivals();
        this.setState({
          loading: false,
          location_name: 'Highlighted Festivals',
          festivals: response_topFour.data.festivals
        });
      }
    );
  };

  render() {
    return (
      <section className="search-area-container" component="Search">
        <div className="search-area">
          <div className="search-bar-container container">
            <div className="search-bar">
              <nav className="uk-navbar-container" uk-navbar="">
                <div className="uk-navbar-item uk-width-expand">
                  <form
                    className="uk-search uk-search-navbar uk-width-1-1"
                    onSubmit={this.onFormSubmit}
                  >
                    <span uk-search-icon=""></span>
                    <input
                      className="uk-search-input"
                      type="search"
                      placeholder="Manchester, TN"
                      name="searchInput"
                      onChange={this.onChange}
                    />
                  </form>
                </div>
              </nav>
            </div>
          </div>
          {this.state.loading ? <Loading /> : <span />}
          <div className="search-results-container container">
            <div className="search-results-region-name">
              {this.state.location_name ? (
                <h2>{this.state.location_name}</h2>
              ) : (
                ''
              )}
            </div>
            <div className="search-results">
              {this.state.festivals ? (
                <CardView
                  cardType="event"
                  colWidth="4"
                  cards={this.state.festivals}
                  section="search-results"
                />
              ) : (
                <span />
              )}
              <Attribution />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
