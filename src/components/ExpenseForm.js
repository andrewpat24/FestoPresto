import React, { Component } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? props.expense.amount / 100 : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: "",
      expenseIsNew: this.props.expenseIsNew
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({
      description
    }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({
      note
    }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount
      }));
    }
  };

  onDateChange = createdAt => {
    if (createdAt)
      this.setState(() => ({
        createdAt
      }));
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Amount and Description must be filled in."
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}

        <input
          autoFocus
          type="text"
          className="text-input"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="add a note for your expense (optional)."
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <div>
          {this.state.expenseIsNew ? (
            <button className="btn md blue-bg">Add Expense</button>
          ) : (
            <button className="btn md blue-bg">Edit Expense</button>
          )}
        </div>
      </form>
    );
  }
}

ExpenseForm.defaultProps = {
  expenseIsNew: true
};

export default ExpenseForm;
