import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("Should correctly render ExpensesSummary with 1 expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={324} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("Should correctly render ExpensesSummary with multiple expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={3} expensesTotal={324345} />
  );
  expect(wrapper).toMatchSnapshot();
});
