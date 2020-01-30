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
    const fieldType = e.target.getAttribute("fieldname");

    const eventData = { ...this.state.event };
    const fieldValue = e.target.value;
    eventData.dates[elementKey][fieldType] = fieldValue;

    this.props.editEvent(this.state.event, eventData);
    this.setState({
      event: { ...eventData }
    });
  };

  addDate = () => {
    const eventData = this.state.event;
    eventData.dates.push({
      starttime: "",
      endtime: "",
      day: ""
    });
    this.props.editEvent(this.state.event, eventData);
    this.setState({
      event: { ...eventData }
    });
  };

  removeDate = e => {
    const eventData = { ...this.state.event };
    const index = parseInt(e.target.getAttribute("parentkey"));
    eventData.dates.splice(index, 1);

    this.props.editEvent(this.state.event, eventData);
    this.setState({ event: { ...eventData } });
  };

  fieldMarkup = (data, index) => {
    return (
      <div key={index}>
        <div className="uk-grid uk-margin" uk-grid="">
          <div className="uk-width-1-2@s">
            <input
              className="uk-input"
              type="text"
              placeholder="Start Time"
              fieldname="starttime"
              parentkey={index}
              value={data["starttime"]}
              onChange={this.onDateFieldChange}
            />

            <input
              className="uk-input"
              type="text"
              placeholder="End Time"
              fieldname="endtime"
              parentkey={index}
              value={data["endtime"]}
              onChange={this.onDateFieldChange}
            />

            <input
              className="uk-input"
              type="text"
              placeholder="Day"
              fieldname="day"
              parentkey={index}
              value={data["day"]}
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
          this.state.event.dates.map((data, index) => {
            return this.fieldMarkup(data, index);
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
