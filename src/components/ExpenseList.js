import React from "react";
import { connect } from "react-redux";
// Components
import ExpenseListItem from "./ExpenseListItem";
// Helpers
import selectExpenses from "../selectors/expenses";

export const ExpenseList = props => {
  let expensesProp;
  if (typeof props.expenses !== "undefined") {
    expensesProp = props.expenses;
  } else {
    expensesProp = [];
  }

  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>

      <div className="list-body">
        {expensesProp.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
          <div>
            {expensesProp.map(expense => {
              return <ExpenseListItem {...expense} key={expense.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
