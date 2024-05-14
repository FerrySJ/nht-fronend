import React from "react";
import { shallow } from "enzyme";
import Mms_turnover from "./mms_turnover";

describe("Mms_turnover", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Mms_turnover />);
    expect(wrapper).toMatchSnapshot();
  });
});
