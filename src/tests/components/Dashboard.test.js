import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../../components/Dashboard";
import expenses from "../fixtures/expenses";

test("Should render dashboard", () => {
  const wrapper = shallow(<Dashboard />);
  expect(wrapper).toMatchSnapshot();
});
