import React from 'react';
import { shallow } from 'enzyme';
import MMS_MCstatus from './MMS_MCstatus';

describe('MMS_MCstatus', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<MMS_MCstatus />);
    expect(wrapper).toMatchSnapshot();
  });
});
