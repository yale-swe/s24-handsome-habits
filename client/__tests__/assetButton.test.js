import React from "react";
import { render } from "@testing-library/react-native";
import AssetButton from "../src/components/assetButton.js";

describe("Asset Button component", () => {

  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<AssetButton state={"purchase"}
                                                coinAmount={100}
                                                onPress={() => jest.fn()}
                                                testID={"asset-button"}/>);

    expect(getByTestId("purchase-button-container")).toBeTruthy();
    expect(getByTestId("purchase")).toBeTruthy();
    expect(getByText("100")).toBeTruthy();
  });
});
