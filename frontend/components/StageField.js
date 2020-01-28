import React from "react";
import { connect } from "react-redux";
// ACTIONS
import { editEvent } from "../actions/event";

class StageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event
    };
  }

  onStageFieldChange = e => {
    const elementKey = e.target.getAttribute("parentkey");

    const eventData = { ...this.state.event };
    const fieldValue = e.target.value;
    eventData.stages[elementKey] = fieldValue;

    this.props.editEvent(this.state.event, eventData);
    this.setState({
      event: { ...eventData }
    });
  };

  removeStage = e => {
    const eventData = { ...this.state.event };
    const index = parseInt(e.target.getAttribute("parentkey"));
    eventData.stages.splice(index, 1);

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
              placeholder="Stage"
              fieldname="name"
              parentkey={index}
              value={name}
              onChange={this.onStageFieldChange}
            />
          </div>
          <div className="uk-width-1-2@s">
            <button
              className="uk-button uk-button-danger"
              onClick={this.removeStage}
              parentkey={index}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  addStage = () => {
    const eventData = this.state.event;
    eventData.stages.push("");

    this.props.editEvent(this.state.event, eventData);
    this.setState({
      event: { ...eventData }
    });
  };

  render() {
    return (
      <div>
        <button
          className="uk-margin uk-button uk-button-default"
          onClick={this.addStage}
        >
          Add Stage
        </button>

        {this.state.event ? (
          this.state.event.stages.map((name, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(StageField);
