import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
// Helpers
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpense extends React.Component {
  onSubmit = expense => {
    const id = this.props.expense.id;
    this.props.startEditExpense(id, expense);
    this.props.history.push("/dashboard");
  };

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            expenseIsNew={false}
            onSubmit={this.onSubmit}
          />
        </div>
        <div className="content-container content-space-around-s">
          <button
            className="btn md blue-secondary-bg btn-space-around"
            onClick={this.onRemove}
          >
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => {
      return expense.id === props.match.params.id;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: expense => dispatch(startRemoveExpense(expense))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpense);
