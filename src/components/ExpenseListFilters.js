import React, { Component } from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
// Helpers
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from "../actions/filters";

export class ExpenseListFilters extends Component {
  state = {
    calendarFocused: null,
    startDateId: 0,
    endDateId: 0
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
    console.log(e.target.value);
  };

  onSortChange = e => {
    console.log("sortBy changed: ", e.target.value);
    e.target.value === "date"
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search expenses.."
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>

          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option>date</option>
              <option>amount</option>
            </select>
          </div>

          <div className="input-group__item">
            <DateRangePicker
              startDateId={"0"}
              endDateId={"0"}
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDates={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => ({
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
