import React from "react";
import { shallow } from "enzyme";
import { EditExpense } from "../../components/EditExpense";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper;
const { amount, createdAt, description, id, note } = expenses[0];

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpense
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[0]}
    />
  );
});

test("Should render EditExpense component correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("Should handle editExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
  expect(history.push).toHaveBeenCalledWith("/dashboard");
  expect(startEditExpense).toHaveBeenLastCalledWith(id, {
    amount,
    createdAt,
    description,
    id,
    note
  });
});

test("Should handle removeExpense", () => {
  wrapper.find("button").prop("onClick")(expenses[0]);
  expect(history.push).toHaveBeenCalledWith("/dashboard");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id
  });
});
