import React from "react";
import { shallow } from "enzyme";
import Grinding from "./grinding";

describe("Grinding", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Grinding />);
    expect(wrapper).toMatchSnapshot();
  });
});
