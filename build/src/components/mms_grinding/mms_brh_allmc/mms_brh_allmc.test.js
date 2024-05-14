import React from "react";
import { shallow } from "enzyme";
import Mms_brh_allmc from "./mms_brh_allmc";

describe("Mms_brh_allmc", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Mms_brh_allmc />);
    expect(wrapper).toMatchSnapshot();
  });
});
