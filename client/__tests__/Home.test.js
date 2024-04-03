import React, { createElement } from "react";
import {render} from "@testing-library/react-native";
import Home from "../src/screens/home.js";
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: jest.fn().mockReturnValue(() => ({
    jsx: true,
    type: '></>',
    props: {},
    key: null,
  })),  
}));

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Home component", () => {
  it("renders correctly", () => {
    const {getByTestId} = render(<NavigationContainer>
      <Home navigation={null} />
    </NavigationContainer>);

    // Check if the "Home Page" text is present
    const welcomeMessage = getByTestId("messageTest");
    expect(welcomeMessage).toBeDefined();
  });

});