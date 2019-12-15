import React from "react";
// Services
import { getEventById } from "../services/events";
// Components
import CardView from "./CardView";

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      ...this.props.computedMatch.params
    };

    getEventById(this.state.id).then(event => {
      this.setState({
        eventData: {
          ...event.data
        }
      });
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

  render() {
    console.log(this.state.eventData);
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
            </div>
          </div>
        </div>

        <h2>{this.state.id}</h2>
      </section>
    );
  }
}

export default Event;
