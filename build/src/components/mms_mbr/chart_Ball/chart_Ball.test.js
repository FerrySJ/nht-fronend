import React from 'react';
import { shallow } from 'enzyme';
import Chart_Ball from './chart_Ball';

describe('Chart_Ball', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Chart_Ball />);
    expect(wrapper).toMatchSnapshot();
  });
});
