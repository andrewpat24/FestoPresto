import React from "react";
import { connect } from "react-redux";
// ACTIONS
import { editEvent } from "../actions/event";

class DateField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event
    };
  }

  onDateFieldChange = e => {
    const elementKey = e.target.getAttribute("parentkey");

    const eventData = { ...this.state.event };
    const fieldValue = e.target.value;
    eventData.dates[elementKey] = fieldValue;

    this.props.editEvent(this.state.event, eventData);
    this.setState({
      event: { ...eventData }
    });
  };

  addDate = () => {
    const eventData = this.state.event;
    eventData.dates.push("");
    debugger;
    this.props.editEvent(this.state.event, eventData);
    this.setState({
      event: { ...eventData }
    });
    console.log(this.state);
  };

  removeDate = e => {
    const eventData = { ...this.state.event };
    const index = parseInt(e.target.getAttribute("parentkey"));
    eventData.dates.splice(index, 1);

    this.props.editEvent(this.state.event, eventData);
    this.setState({ event: { ...eventData } });
  };

  fieldMarkup = (name, index) => {
    return (
      <div key={index}>
        <div className="uk-grid uk-margin" uk-grid="">
          <div className="uk-width-1-2@s">
            <input
              className="uk-input"
              type="text"
              placeholder="Date"
              fieldname="name"
              parentkey={index}
              value={name}
              onChange={this.onDateFieldChange}
            />
          </div>
          <div className="uk-width-1-2@s">
            <button
              className="uk-button uk-button-danger"
              onClick={this.removeDate}
              parentkey={index}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <button
          className="uk-margin uk-button uk-button-default"
          onClick={this.addDate}
        >
          Add Date
        </button>

        {this.state.event ? (
          this.state.event.dates.map((name, index) => {
            return this.fieldMarkup(name, index);
          })
        ) : (
          <span />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editEvent: (oldFields, newFields) => dispatch(editEvent(oldFields, newFields))
});

const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, mapDispatchToProps)(DateField);
