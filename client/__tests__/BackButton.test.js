import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import BackButton from "../src/components/backButton";

// Mock storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("Back Button Component", () => {

    const testID = "BackButton";

    it("renders correctly", () => {
        const { getByTestId } = render(<BackButton testID={testID}/>);
        expect(getByTestId("BackButton")).toBeTruthy();
    });

    it("triggers onPress when pressed", () => {

        const mockOnPress = jest.fn();
        const { getByTestId } = render(<BackButton onPress={mockOnPress} testID={testID} />);

        const button = getByTestId("touchableBack"); // get the pressable part of the button
        fireEvent.press(button);

        // Expect the mock onPress function to have been called exactly once
        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });

});
