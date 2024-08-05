import React from "react";
import { shallow } from "enzyme";
import Status_mbr from "./status_mbr";

describe("Status_mbr", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Status_mbr />);
    expect(wrapper).toMatchSnapshot();
  });
});
