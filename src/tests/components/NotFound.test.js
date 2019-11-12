import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../components/NotFound";
import expenses from "../fixtures/expenses";

test("Should render NotFound component correctly", () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});

// test("Should render ExpenseListItem with expense element", () => {
//     const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
//     expect(wrapper).toMatchSnapshot();
//   });
