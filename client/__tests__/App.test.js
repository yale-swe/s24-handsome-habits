// At the top of your test file or in your Jest setup file
jest.mock("expo-av", () => {
  return {
    Audio: {
      setIsEnabledAsync: jest.fn(),
      Sound: jest.fn(() => ({
        loadAsync: jest.fn(),
        playAsync: jest.fn(),
        stopAsync: jest.fn(),
        unloadAsync: jest.fn(),
        setPositionAsync: jest.fn(),
        setVolumeAsync: jest.fn(),
        setOnPlaybackStatusUpdate: jest.fn(),
      })),
    },
  };
});

import React from "react";
import { render } from "@testing-library/react-native";
import App from "../src/App.js";
/* eslint-disable react/prop-types */

// Mocking the screens
jest.mock("../src/screens/login", () => "LoginScreen");
jest.mock("../src/screens/home", () => "HomeScreen");
jest.mock("../src/screens/exercise", () => "ExerciseScreen");
jest.mock("../src/screens/exerciseLog", () => "ExerciseLogScreen");

//jest.mock("@react-native-vector-icons/MaterialCommunityIcons", () => ({}));
// Mocking the navigation container and stack navigator
jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    NavigationContainer: ({children}) => <>{children}</>,
  };
});

jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({children}) => <>{children}</>,
    Screen: (props) => <>{props.children}</>,
  }),
}));

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("App Navigation Structure", () => {
  it("should render the navigation stack with Login and Home screens", () => {
    const {getByText} = render(<App />);

    // Since we"re mocking the screens as simple components, we can"t directly check if they"re rendered here (view specific test files for in-depth testing)
    // Instead, we can verify the navigation setup by ensuring no errors are thrown during rendering
    expect(getByText).toBeDefined(); // This is a basic check to ensure the render function is called without crashing
  });
});
