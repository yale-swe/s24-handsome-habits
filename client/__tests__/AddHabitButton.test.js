import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AddHabitButton from "../src/components/AddHabitButton";

// Mock storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("AddHabitButton Component", () => {

    // test render
    it("renders correctly", () => {
        const { getByText } = render(<AddHabitButton text="Add Test Habit" />);
        expect(getByText("Add Test Habit")).toBeTruthy(); // find button by text
    });

    // test onPress function is called on press
    it("triggers onPress when pressed", () => {

        const mockOnPress = jest.fn();
        const { getByText } = render(<AddHabitButton text="Add Test Habit" onPress={mockOnPress} />);

        const button = getByText("Add Test Habit"); // get the button by text
        fireEvent.press(button);

        expect(mockOnPress).toHaveBeenCalledTimes(1); // check if onPress function is called exactly once

    });

});
