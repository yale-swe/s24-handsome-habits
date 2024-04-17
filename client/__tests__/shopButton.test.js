import React from "react";
import { render } from "@testing-library/react-native";
import { Buttons } from "../src/styles";
import ShopButton from "../src/components/shopButton.js";

describe("Shop Button component", () => {

  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<ShopButton style={Buttons.shopButton}
                                                          onPress={() => jest.fn()}
                                                          asset={"bottoms"}
                                                          testID={"bottoms-button"}
                                                          opacity={"1.0"}/>);

    expect(getByTestId("bottoms-button")).toBeTruthy();
    expect(getByText("bottoms")).toBeTruthy();
  });

});
