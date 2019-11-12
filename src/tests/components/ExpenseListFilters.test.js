import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import moment from "../__mocks__/moment";
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      setTextFilter={setTextFilter}
      filters={filters}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("Should render ExpenseListFilters component", () => {
  expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseListFilters component with alt data", () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test("Should handle text change", () => {
  const value = "Testing is awesome";
  wrapper.find("input").simulate("change", {
    target: {
      value
    }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("Should sort by date", () => {
  wrapper.setProps({
    filters: altFilters
  });
  const value = "date";
  wrapper.find("select").simulate("change", {
    target: {
      value
    }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test("Should sort by amount", () => {
  wrapper.setProps({
    filters: altFilters
  });
  const value = "amount";
  wrapper.find("select").simulate("change", {
    target: {
      value
    }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test("Should handle date changes", () => {
  const value = {
    startDate: moment(0).add(1, "days"),
    endDate: moment(0).add(2, "days")
  };
  wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")(value);

  expect(setStartDate).toHaveBeenLastCalledWith(value.startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(value.endDate);
});

test("Should handle date focus changes", () => {
  const calendarFocused = "startDate";
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(
    calendarFocused
  );

  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
  //   expect(wrapper.state("amount")).toBe(value);
});
