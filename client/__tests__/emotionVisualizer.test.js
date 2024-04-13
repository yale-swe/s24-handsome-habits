import React from "react";
import { render } from "@testing-library/react-native";
import EmotionVisualizer from "../src/components/emotionVisualizer.js";

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Emotion Visualizer component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<EmotionVisualizer/>);

    // test that the main container is rendering
    expect(getByTestId("emotions-testing")).toBeTruthy();
    // test that the main bulldog image is rendering
    expect(getByTestId("emotions-image")).toBeTruthy();
  });
});
