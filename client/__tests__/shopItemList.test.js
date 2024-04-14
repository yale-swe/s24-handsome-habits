import React from "react";
import { render } from "@testing-library/react-native";
import ShopItemList from "../src/components/shopItemList";

describe("Shop item list", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<ShopItemList category={"tops"} testID={"shop-item-list"}/>);

    expect(getByTestId("shop-item-list")).toBeTruthy();
  });
});
