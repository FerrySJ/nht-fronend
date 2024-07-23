import React from "react";
import { shallow } from "enzyme";
import Mms_autonoise from "./mms_autonoise";

describe("Mms_autonoise", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Mms_autonoise />);
    expect(wrapper).toMatchSnapshot();
  });
});
