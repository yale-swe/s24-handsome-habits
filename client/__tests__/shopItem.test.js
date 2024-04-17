import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import ShopItem from "../src/components/shopItem";
import { addAsset, setActiveAssets } from "../src/services/AssetsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePoints } from "../src/services/PointsService";

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn().mockResolvedValue(JSON.stringify({
    eating_points: 23,
    sleeping_points: 25,
    studying_points: 10,
    exercise_points: 20,
    coins: 500,
    wellness_points: 78,
    emotion_value: 2,
  })),
  setItem: jest.fn(),
}));

jest.mock("../src/services/AssetsService", () => ({
  addAsset: jest.fn(),
  setActiveAssets: jest.fn(),
}));

jest.mock("../src/services/PointsService", () => ({
  updatePoints: jest.fn(),
}));

describe("Shop items", () => {
  it("render correctly", () => {
    const { getByTestId } = render(<ShopItem category={"tops"} testID={"shop-item-list"}/>);

    expect(getByTestId("shop-item-testing")).toBeTruthy();
    expect(getByTestId("shop-item-container")).toBeTruthy();
  });

  it("calls handle purchase on press when unowned", async () => {
    const { getByTestId } = render(<ShopItem category={"tops"} coinUpdater={jest.fn()} assetUpdater={jest.fn()} coinAmount={10} name={"white_tshirt"} testID={"shop-item-list"}/>);
    fireEvent.press(getByTestId("asset-button"));

    await waitFor(() => {
      expect(AsyncStorage.getItem).toBeCalled();
      expect(updatePoints).toBeCalled();
      expect(addAsset).toBeCalled();
    });
  });

  it("calls handle put on on press when owned", async () => {
    const { getByTestId } = render(<ShopItem category={"tops"} assetInfo={{owned: {tops: "white_tshirt"}, active: {tops: "yale_tshirt"}}} coinUpdater={jest.fn()} assetUpdater={jest.fn()} coinAmount={10} name={"white_tshirt"} testID={"shop-item-list"}/>);
    fireEvent.press(getByTestId("asset-button"));

    await waitFor(() => {
      expect(setActiveAssets).toBeCalled();
    });
  })
});
