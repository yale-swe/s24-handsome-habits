import React from "react";
import { render } from "@testing-library/react-native";
import HabitButton from "../src/components/habitButton.js";
import { Buttons } from "../src/styles/index.js";

describe("Habit Button component", () => {

  it("renders correctly", () => {
    const { getByTestId } = render(<HabitButton logo={require("../src/assets/images/exercising_icon.png")}
                                                style={Buttons.habitButton}
                                                onPress={() => jest.fn()}
                                                testID={"exercising-button"}/>);

    // Check if the habit button's touchable opacity is properly rendered
    expect(getByTestId("exercising-button")).toBeTruthy();
    expect(getByTestId("habit-button-image")).toBeTruthy();
    expect(getByTestId("habit-button-container")).toBeTruthy();
  });

  // test for if the button is functional? or is this only a homepage issue
});
