import React from "react";
import { shallow } from "enzyme";
import Realtime_mbr from "./realtime_mbr";

describe("Realtime_mbr", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Realtime_mbr />);
    expect(wrapper).toMatchSnapshot();
  });
});
