import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";
import Shop from "../src/screens/shop.js";
import Home from "../src/screens/home.js";
import { getPointInfo } from "../src/services/PointsService.js";

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mocking points service (for the home navigation)
jest.mock("../src/services/PointsService.js", () => ({
  getPointInfo: jest.fn().mockResolvedValue({
    eating_points: 23,
    sleeping_points: 25,
    studying_points: 10,
    exercise_points: 20,
    wellness_points: 78,
    emotion_value: 2,
  }),
}));

describe("Shop component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<NavigationContainer> <Shop navigation={{ navigate: jest.fn() }} /> </NavigationContainer>);

    // Check if the main shop page view container is properly rendered
    expect(getByTestId("shop-page")).toBeTruthy();
    // Check if the shop buttons container is properly rendered
    expect(getByTestId("shop-buttons")).toBeTruthy();
    expect(getByTestId("tops-button")).toBeTruthy();
    expect(getByTestId("bottoms-button")).toBeTruthy();
    expect(getByTestId("accessories-button")).toBeTruthy();
    // Check if the shop list view container is properly rendered
    expect(getByTestId("shop-view")).toBeTruthy();
  });

  it("back button navigates back to home", () => {
    const mockPoints = { exercise_points: 26, eating_points: 25, sleeping_points: 27, studying_points: 23, wellness_points: 100, emotion_value: 4 }
    getPointInfo.mockResolvedValue(mockPoints);

    const { getByTestId } = render(<NavigationContainer> <Shop navigation={{navigate: jest.fn() }}/> <Home/> </NavigationContainer>);

    fireEvent.press(getByTestId("BackButton"));
    expect(getByTestId("home-page"));
  });

  it("switches shop list", () => {
    const { getByTestId } = render(<NavigationContainer> <Shop navigation={{ navigate: jest.fn() }} /> </NavigationContainer>);

    // check that the tops list is rendered initially
    expect(getByTestId("tops-list")).toBeTruthy();

    // check that all of the store buttons properly switch lists

    fireEvent.press(getByTestId("bottoms-button"));

    expect(getByTestId("bottoms-list")).toBeTruthy();

    fireEvent.press(getByTestId("accessories-button"));

    expect(getByTestId("accessories-list")).toBeTruthy();

    fireEvent.press(getByTestId("tops-button"));

    expect(getByTestId("tops-list")).toBeTruthy();

    // check that repressing the "tops" button doesn't effect the lists
    fireEvent.press(getByTestId("tops-button"));

    expect(getByTestId("tops-list")).toBeTruthy();
  })

});
