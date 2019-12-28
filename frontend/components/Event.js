import React from "react";
import { connect } from "react-redux";
// Services
import { getEventById } from "../services/events";
import { getArtistsYouFollow } from "../services/spotify";
// Components
import CardView from "./CardView";
import GeneratePlaylist from "./GeneratePlaylist";

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      ...this.props.computedMatch.params,
      followedArtists: []
    };

    // TODO: Have .then and .catch generate appropriate markup.
    // Before then or catch is triggered show loading animation
    // then: event markup
    // catch: 404 markup
    getEventById(this.state.id)
      .then(event => {
        console.log(this.props.spotify_uid);
        this.getFollowedArtists(event.data.lineup).then(followedArtists => {
          this.setState({
            eventData: {
              ...event.data
            },
            followedArtists
          });
        });
      })
      .catch(e => {
        console.log("eventERR:", e);
      });
  }

  async getFollowedArtists(eventLineup) {
    const eventLineupIdentifiers = [];
    const spotify_uid = this.props.spotify_uid;
    eventLineup.forEach(artist => {
      eventLineupIdentifiers.push(spotify_uid + "_" + artist.artist_id);
    });

    const followedArtists = await getArtistsYouFollow(eventLineupIdentifiers);

    const followedArtistsArray = followedArtists.data.artists.map(artist => {
      const { _id, name, artist_id, spotify_uid, identifier } = artist;
      return {
        _id,
        name,
        artist_id,
        spotify_uid,
        identifier
      };
    });

    return followedArtistsArray;
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
      return artist.artist_id;
    });
  }

  render() {
    return (
      <section className="Event-container" component="Event">
        <div className="Event">
          <div className="header-area-container uk-heading-divider">
            <div className="header-area">
              <div className="header-title uk-heading-medium">
                {this.state.eventData ? this.state.eventData.name : ""}
              </div>
              <div className="header-subtitle"></div>
            </div>
          </div>

          <div className="event-content-container">
            <div className="event-content">
              <div uk-grid="">
                <div className="uk-width-expand@m">
                  <div className="main-content-container">
                    <div className="main-content">
                      <div className="about-area-container section-container">
                        <div className="about-area">
                          <div className="about-header uk-heading-small">
                            About.
                          </div>
                          <div className="about-content">
                            {this.state.eventData
                              ? this.state.eventData.description
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div className="event-lineup-container section-container">
                        <div className="event-lineup">
                          <div className="uk-heading-small">Lineup.</div>
                          {this.state.followedArtists.length > 0 ? (
                            <div className="event-user-lineup-container section-container">
                              <div className="event-user-lineup">
                                <h3>Artists you follow</h3>
                                {
                                  <CardView
                                    cardType="artist"
                                    colWidth="4"
                                    cards={this.state.followedArtists}
                                    section="followed_artists"
                                  />
                                }
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="event-all-lineup-container section-container">
                            <div className="event-all-lineup">
                              <h3>All artists</h3>
                              {this.state.eventData ? (
                                <CardView
                                  cardType="artist"
                                  colWidth="4"
                                  cards={this.state.eventData.lineup}
                                  section="all_artists"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="uk-width-1-4@s">
                  <div className="sidebar-content-container">
                    <div className="sidebar-content">
                      <div className="event-information-container">
                        <div className="event-information">
                          <div className="event-links-container section-container">
                            <div className="event-links-header sidebar-header uk-text-lead">
                              More Info.
                            </div>
                            <div className="event-links">
                              {this.state.eventData
                                ? this.generateLinksMarkup(
                                    this.state.eventData.links
                                  )
                                : ""}
                            </div>
                          </div>
                          <div className="event-details-container section-container">
                            <div className="event-details-header sidebar-header uk-text-lead">
                              Details.
                            </div>
                            <div className="event-details">
                              {this.state.eventData
                                ? this.state.eventData.location
                                : ""}
                            </div>
                          </div>
                          <div className="event-dates-container section-container">
                            <div className="event-dates-header sidebar-header uk-text-lead">
                              Event Dates.
                            </div>
                            <div className="event-dates"></div>
                          </div>
                          <div className="event-playlist-container section-container">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { spotify_uid: state.auth.uid };
};

export default connect(mapStateToProps)(Event);
