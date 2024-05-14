import React from "react";
import { shallow } from "enzyme";
import Table_mbr from "./table_mbr";

describe("Table_mbr", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Table_mbr />);
    expect(wrapper).toMatchSnapshot();
  });
});
