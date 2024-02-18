import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Login from '../src/screens/login.js'; 
import * as Google from 'expo-auth-session/providers/google';
import { logout } from '../src/services/authenticationUtil.js'; // Adjust the import path

// Mocking Google Authentication and logout function
jest.mock('expo-auth-session/providers/google', () => ({
  useAuthRequest: jest.fn().mockReturnValue([
    {}, // mock request
    null, // mock response 
    jest.fn(), // mock promptAsync function
  ]),
}));

jest.mock('../src/services/authenticationUtil.js', () => ({
  Authentication: jest.fn(),
  logout: jest.fn(),
}));

describe('Login Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Welcome to')).toBeTruthy();
    expect(getByText('Handsome Habits')).toBeTruthy();
  });

  it('calls Google sign-in on button press', () => {
    const promptAsyncMock = jest.fn();
    Google.useAuthRequest.mockImplementation(() => ([{}, {}, promptAsyncMock]));

    const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByText('Sign in with Google'));
    expect(promptAsyncMock).toHaveBeenCalled();
  });

  it('calls logout on button press', () => {
    const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByText('Delete Saved Users'));
    expect(logout).toHaveBeenCalled();
  });

});
