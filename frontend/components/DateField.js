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

    const links = this.state.links;
    const fieldValue = e.target.value;
  };

  generateFieldMarkdown = () => {
    return (
      <div key={1}>
        <div className="uk-grid uk-margin" uk-grid="">
          <div className="uk-width-1-2@s">
            <input
              className="uk-input"
              type="text"
              placeholder="Name"
              value={1}
              fieldname="name"
              parentkey={1}
              onChange={() => {}}
            />
          </div>
          <div className="uk-width-1-2@s">
            <input
              className="uk-input"
              type="text"
              placeholder="Url"
              value={1}
              fieldname="url"
              parentkey={1}
              onChange={() => {}}
            />
          </div>
        </div>
        <button
          className="uk-button uk-button-danger"
          onClick={() => {}}
          parentkey={1}
        >
          Remove
        </button>
      </div>
    );
  };

  render() {
    return <div></div>;
  }
}

const mapDispatchToProps = dispatch => ({
  editEvent: (oldFields, newFields) => dispatch(editEvent(oldFields, newFields))
});

const mapStateToProps = store => ({
  event: store.event
});

export default connect(mapStateToProps, mapDispatchToProps)(DateField);
