import React from "react";
import { render } from "@testing-library/react-native";
import ShopItem from "../src/components/shopItem";

describe("Shop items", () => {
  it("render correctly", () => {
    const { getByTestId } = render(<ShopItem category={"tops"} testID={"shop-item-list"}/>);

    expect(getByTestId("shop-item-testing")).toBeTruthy();
    expect(getByTestId("shop-item-container")).toBeTruthy();
  });
});
