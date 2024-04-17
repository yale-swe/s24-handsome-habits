import React from "react";
import { render } from "@testing-library/react-native";
import ShopItemList from "../src/components/shopItemList";

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Shop item list", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<ShopItemList category={"tops"} testID={"shop-item-list"}/>);

    expect(getByTestId("shop-item-list")).toBeTruthy();
  });
});
