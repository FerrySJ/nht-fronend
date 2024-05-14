import React from 'react';
import { shallow } from 'enzyme';
import Chart_DT_MD from './Chart_DT_MD';

describe('Chart_DT_MD', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Chart_DT_MD />);
    expect(wrapper).toMatchSnapshot();
  });
});
