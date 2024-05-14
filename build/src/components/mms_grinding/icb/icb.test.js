import React from "react";
import { shallow } from "enzyme";
import Icb from "./icb";

describe("Icb", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Icb />);
    expect(wrapper).toMatchSnapshot();
  });
});
