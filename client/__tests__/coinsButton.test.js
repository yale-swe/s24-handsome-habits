import React from "react";
import { render } from "@testing-library/react-native";
import CoinsButton from "../src/components/coinsButton.js";
import { Buttons } from "../src/styles/index.js";

describe("Coins Button component", () => {

  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<CoinsButton logo={require("../src/assets/images/coin.png")}
                                                style={Buttons.coinsButton}
                                                onPress={() => jest.fn()}
                                                testID={"coins-button"}
                                                coinAmount={100}/>);

    // Check if the coin button's touchable opacity is properly rendered
    expect(getByTestId("coins-button")).toBeTruthy();
    // Check if the coin button's coin image is properly rendered
    expect(getByTestId("coins-button-image")).toBeTruthy();
    // Check if the coin button's overall container is properly rendered
    expect(getByTestId("coins-button-container")).toBeTruthy();
    // Check if the coin button's image and value container is properly rendered
    expect(getByTestId("coins-info-container")).toBeTruthy();
    // Check that the user's coins are displayed
    expect(getByText("100")).toBeTruthy();
  });
});
