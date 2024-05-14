import React from 'react';
import { shallow } from 'enzyme';
import MMS_MBRMD from './MMS_MBRMD';

describe('MMS_MBRMD', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<MMS_MBRMD />);
    expect(wrapper).toMatchSnapshot();
  });
});
