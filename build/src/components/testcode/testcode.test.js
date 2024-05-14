import React from "react";
import { shallow } from "enzyme";
import Testcode from "./testcode";

describe("Testcode", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Testcode />);
    expect(wrapper).toMatchSnapshot();
  });
});
