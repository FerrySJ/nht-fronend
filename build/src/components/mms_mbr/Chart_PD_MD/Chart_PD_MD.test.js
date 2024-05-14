import React from 'react';
import { shallow } from 'enzyme';
import Chart_PD_MD from './Chart_PD_MD';

describe('Chart_PD_MD', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Chart_PD_MD />);
    expect(wrapper).toMatchSnapshot();
  });
});
