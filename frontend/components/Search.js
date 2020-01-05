import React from "react";
// Components
import CardView from "./CardView";
// Services
import { getEvents } from "../services/events";
// Selectors
import getVisibleExpenses from "../selectors/events";

class Search extends React.Component {
  constructor(props) {
    super(props);
    // this.searchInput = React.createRef();
    // this.textInput = React.createRef();
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      ...props,
      searchValue: ""
    };

    this.getEventsWithFilter({}).then(events => {
      this.setState({
        events
      });
    });
  }

  async getEventsWithFilter(filter = {}) {
    const events = await getEvents(filter);
    return events.data;
  }

  onFormSubmit(event) {
    event.preventDefault();
    const searchQuery = this.state.searchValue;
    this.getEventsWithFilter({ name: searchQuery }).then(events => {
      console.log(events);
      this.setState({
        events
      });
    });
  }

  onChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  generateCardView(cards) {
    console.log("GENERATECARDVIEW", cards);
    return this.state.events ? (
      <CardView cardType="event" colWidth="4" cards={cards} />
    ) : (
      <span />
    );
  }

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
                      placeholder="Search..."
                      name="searchInput"
                      onChange={this.onChange}
                    />
                  </form>
                </div>
              </nav>
            </div>
          </div>
          <div className="search-results-container container">
            <div className="search-results">
              {this.state.events ? (
                <CardView
                  cardType="event"
                  colWidth="4"
                  cards={this.state.events}
                />
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
