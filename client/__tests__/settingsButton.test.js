import React from "react";
import { render } from "@testing-library/react-native";
import SettingsButton from "../src/components/settingsButton.js";
import { Buttons } from "../src/styles/index.js";

describe("Settings Button component", () => {

  it("renders correctly", () => {
    const { getByTestId } = render(<SettingsButton logo={require("../src/assets/images/bulldoghead.png")}
                                                   style={Buttons.settingsButton}
                                                   onPress={() => jest.fn()}
                                                   testID={"settings-button"}/>);

    // Check if the settings button's touchable opacity is properly rendered
    expect(getByTestId("settings-button")).toBeTruthy();
    // Check if the settings button's main container is properly rendered
    expect(getByTestId("settings-button-container")).toBeTruthy();
  });

  // test for if the button is functional? or is this only a homepage issue
});
