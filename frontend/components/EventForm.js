import React from "react";
import { connect } from "react-redux";

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "New Event"
    };
  }

  render() {
    return (
      <section component="EventForm">
        <div className="event-form-container">
          <div className="event-form">
            <form>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">Legend</legend>

                {/** Name */}
                <div className="uk-margin">
                  <input
                    className="uk-input uk-form-width-large uk-form-large"
                    type="text"
                    placeholder="Name"
                  />
                </div>

                {/** Description */}
                <div class="uk-margin">
                  <textarea
                    class="uk-textarea"
                    rows="5"
                    placeholder="Description.."
                  ></textarea>
                </div>

                {/** Location */}
                <div className="uk-margin">
                  <input
                    className="uk-input uk-form-width-large"
                    type="text"
                    placeholder="Location"
                  />
                </div>
                {/** Event Dates */}

                {/** Links */}

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
