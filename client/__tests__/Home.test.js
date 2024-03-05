import React from 'react';
import {render} from '@testing-library/react-native';
import Home from '../src/screens/home.js'; 

describe('Home component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<Home navigation={null} />);

    // Check if the "Home Page" text is present
    expect(getByText('Home Page')).toBeTruthy();
  });

});