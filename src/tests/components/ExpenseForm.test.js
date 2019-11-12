import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("Should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseForm with fixture", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });

  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("Should set description on input change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "Testing is so much fun.";
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: {
        value
      }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("Should set note on textarea change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "Testing is LOTS of fun.";
  wrapper
    .find("textarea")
    .at(0)
    .simulate("change", {
      target: {
        value
      }
    });
  expect(wrapper.state("note")).toBe(value);
});

test("Should set amount of valid input", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "133.7";

  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: {
        value
      }
    });
  expect(wrapper.state("amount")).toBe(value);
});

test("Should not set amount if invalid input", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "1.33.7";

  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: {
        value
      }
    });

  expect(wrapper.state("amount")).toBeFalsy();
});

test("Should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });

  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test("Should set new date on date change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const now = moment();
  wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

// Check if onFocusChange sets calendarFocused
// Should set calendarFocused on change

test("Check if onFocusChange sets calendarFocused", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({
    focused
  });
  expect(wrapper.state("calendarFocused")).toBeTruthy();
});
