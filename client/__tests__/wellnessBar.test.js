import React from "react";
import { render } from "@testing-library/react-native";
import WellnessBar from "../src/components/wellnessBar.js";

// // Mocking AsyncStorage and Api
// jest.mock('@react-native-async-storage/async-storage', () => ({
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
// }));

describe("Wellness Bar component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<WellnessBar wellnessPoints={50}/>);

    // test that the background of the wellness bar renders
    expect(getByTestId("wellness-background")).toBeTruthy();
    // test that the foreground of the wellness bar renders
    expect(getByTestId("wellness-foreground")).toBeTruthy();
    // make sure it properly renders the width
    const foreground = getByTestId("wellness-foreground");
    expect(foreground.props.style[1].width).toBe(172);
  });
});
