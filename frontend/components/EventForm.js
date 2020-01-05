import React from "react";
import { connect } from "react-redux";

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      eventName: "New Event",
      description: "",
      location: "",
      searchValue: ""
    };
  }

  onFormSubmit = e => {};

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

  render() {
    return (
      <section component="EventForm">
        <div className="event-form-container">
          <div className="event-form">
            <form onSubmit={this.onFormSubmit}>
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

                {/** Stages */}

                {/** Links */}
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { spotify_uid: state.auth.uid };
};

export default connect(mapStateToProps)(EventForm);
