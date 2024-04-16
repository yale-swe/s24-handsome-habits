import React from "react";
import { render } from "@testing-library/react-native";
import AssetButton from "../src/components/assetButton.js";

describe("Asset Button component", () => {

  it("renders purhcase button when state is unowned", () => {
    const { getByTestId, getByText } = render(<AssetButton state={"unowned"}
                                                coinAmount={100}
                                                onPress={() => jest.fn()}
                                                testID={"asset-button"}/>);

    expect(getByTestId("purchase-button-container")).toBeTruthy();
    expect(getByTestId("purchase")).toBeTruthy();
    expect(getByText("100")).toBeTruthy();
  });

  it("renders put on button when state is owned", () => {
    const { getByTestId, getByText } = render(<AssetButton state={"owned"}
                                                coinAmount={100}
                                                onPress={() => jest.fn()}
                                                testID={"asset-button"}/>);

    expect(getByTestId("put-on-button-container")).toBeTruthy();
    expect(getByTestId("put-on")).toBeTruthy();
    expect(getByText("Put On")).toBeTruthy();
  });

  it("renders wearing! when state is wearing", () => {
    const { getByTestId, getByText } = render(<AssetButton state={"wearing"}
                                                coinAmount={100}
                                                onPress={() => jest.fn()}
                                                testID={"asset-button"}/>);

    expect(getByTestId("wearing-container")).toBeTruthy();
    expect(getByTestId("wearing")).toBeTruthy();
    expect(getByText("Wearing!")).toBeTruthy();
  });
});
