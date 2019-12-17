import React from "react";
// Services
import { getEventById } from "../services/events";
// Components
import CardView from "./CardView";
import GeneratePlaylist from "./GeneratePlaylist";
// Services

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      ...this.props.computedMatch.params
    };

    // TODO: Have .then and .catch generate appropriate markup.
    // Before then or catch is triggered show loading animation
    // then: event markup
    // catch: 404 markup
    getEventById(this.state.id)
      .then(event => {
        console.log("event:", event);

        this.setState({
          eventData: {
            ...event.data
          }
        });

        // console.log(this.state);
      })
      .catch(e => {
        console.log("eventERR:", e);
      });
  }

  generateLinksMarkup(links) {
    return links.map(link => {
      return (
        <div key={link._id}>
          {link.title} {link.url}
        </div>
      );
    });
  }

  getLineupIds(lineupArray) {
    return lineupArray.map(artist => {
      console.log(artist);
      return artist.artist_id;
    });
  }

  render() {
    console.log("EventData:", this.state.eventData);
    return (
      <section className="Event-container" component="Event">
        <div className="Event">
          <div className="event-content-container">
            <div className="event-content">
              <div className="header-area-container">
                <div className="header-area">
                  <div className="header-title">
                    <h1>
                      {this.state.eventData ? this.state.eventData.name : ""}
                    </h1>
                  </div>
                  <div className="header-subtitle">
                    <h2>
                      {this.state.eventData
                        ? this.state.eventData.location
                        : ""}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="about-area-container">
                <div className="about-area">
                  <div className="about-content">
                    <h3>
                      {this.state.eventData
                        ? this.state.eventData.description
                        : ""}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="event-lineup-container">
                <div className="event-lineup">
                  <h2>Lineup.</h2>
                  <div className="event-user-lineup-container">
                    <div className="event-user-lineup">
                      <h3>Artists you follow</h3>
                    </div>
                  </div>
                  <div className="event-all-lineup-container">
                    <div className="event-all-lineup">
                      <h3>All artists</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="event-information-container">
            <div className="event-information">
              <div className="event-links-container">
                <div className="event-links-header">
                  <h2>More Info.</h2>
                </div>
                <div className="event-links">
                  {this.state.eventData
                    ? this.generateLinksMarkup(this.state.eventData.links)
                    : ""}
                </div>
              </div>
              <div className="event-details-container">
                <div className="event-details-header">
                  <h2>Details.</h2>
                </div>
                <div className="event-details"></div>
              </div>
              <div className="event-dates-container">
                <div className="event-dates-header">
                  <h2>Event Dates.</h2>
                </div>
                <div className="event-dates"></div>
              </div>
              <div className="event-playlist-container">
                <div className="event-playlist">
                  {this.state.eventData ? (
                    <GeneratePlaylist
                      eventName={this.state.eventData.name}
                      lineupArray={this.getLineupIds(
                        this.state.eventData.lineup
                      )}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>{this.state.id}</h2>
      </section>
    );
  }
}

export default Event;

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: !!state.auth.uid
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
