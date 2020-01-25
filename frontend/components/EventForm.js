import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// Actions
import { newEvent } from "../actions/event";
// Services
import { createEvent } from "../services/events";
// Components
import DateField from "./DateField";
import StageField from "./StageField";

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      redirect: "",
      eventName: "New Event",
      description: "",
      location: "",
      links: []
    };
    this.props.newEvent();
  }

  preventDefault = e => {
    e.preventDefault();
  };

  onFormSubmit = e => {
    createEvent({
      creator_uid: this.props.spotify_uid,
      name: this.state.eventName,
      description: this.state.description,
      location: this.state.location,
      links: this.state.links
    })
      .then(event => {
        const redirect = `/event/${event.data._id}`;
        this.setState({ redirect });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onNameChange = e => {
    this.setState({
      eventName: e.target.value
    });
  };

  onDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };

  onLocationChange = e => {
    this.setState({
      location: e.target.value
    });
  };

  //   <LINKS LOGIC AND MARKUP >
  onLinkFieldChange = e => {
    const elementKey = e.target.getAttribute("parentkey");
    const fieldType = e.target.getAttribute("fieldname");

    const links = this.state.links;
    const fieldValue = e.target.value;
    links[elementKey][fieldType] = fieldValue;

    this.setState({
      links
    });
  };

  addLink = () => {
    const links = this.state.links;
    links.push({
      name: "",
      url: ""
    });

    this.setState({
      links
    });
  };

  removeLink = e => {
    const links = [...this.state.links];
    const index = e.target.getAttribute("parentkey");
    links.splice(index, 1);

    this.setState({
      links: [...links]
    });
  };

  linkMarkup = (data, index) => {
    return (
      <div key={index}>
        <div className="uk-grid uk-margin" uk-grid="">
          <div className="uk-width-1-2@s">
            <input
              className="uk-input"
              type="text"
              placeholder="Name"
              value={data.name}
              fieldname="name"
              parentkey={index}
              onChange={this.onLinkFieldChange}
            />
          </div>
          <div className="uk-width-1-2@s">
            <input
              className="uk-input"
              type="text"
              placeholder="Url"
              value={data.url}
              fieldname="url"
              parentkey={index}
              onChange={this.onLinkFieldChange}
            />
          </div>
        </div>
        <button
          className="uk-button uk-button-danger"
          onClick={this.removeLink}
          parentkey={index}
        >
          Remove
        </button>
      </div>
    );
  };
  //   <LINKS LOGIC AND MARKUP />

  render() {
    return (
      <section component="EventForm">
        {this.state.redirect.length > 0 ? (
          <Redirect to={this.state.redirect} />
        ) : (
          <span />
        )}
        <div className="event-form-container">
          <div className="event-form">
            <form onSubmit={this.preventDefault}>
              <fieldset className="uk-fieldset uk-form-width-large">
                {/** TODO: Change the legend title to whatever's written in the name once there's input. If it's empty, change it back to New Event.*/}
                <legend className="uk-legend">New Event</legend>

                {/** Name */}
                <div className="uk-margin">
                  <input
                    className="uk-input  uk-form-large"
                    type="text"
                    placeholder="Name"
                    onChange={this.onNameChange}
                  />
                </div>

                {/** Description */}
                <div className="uk-margin">
                  <textarea
                    className="uk-textarea"
                    rows="5"
                    placeholder="Description.."
                    onChange={this.onDescriptionChange}
                  ></textarea>
                </div>

                {/** Location */}
                <div className="uk-margin">
                  <input
                    className="uk-input "
                    type="text"
                    placeholder="Location"
                    onChange={this.onLocationChange}
                  />
                </div>

                {/** Event Dates */}
                <DateField />

                {/** Stages */}
                <StageField />

                {/** Links */}
                <button
                  className="uk-margin uk-button uk-button-default"
                  onClick={this.addLink}
                >
                  Add Link
                </button>
                {this.state.links.length > 0 ? (
                  this.state.links.map((data, index) => {
                    return this.linkMarkup(data, index);
                  })
                ) : (
                  <span />
                )}
                {/**Submit */}
                <div className="uk-margin">
                  <button
                    className="uk-button uk-button-default"
                    onClick={this.onFormSubmit}
                  >
                    Submit
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  newEvent: () => dispatch(newEvent())
});

const mapStateToProps = store => {
  return { spotify_uid: store.auth.uid };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
