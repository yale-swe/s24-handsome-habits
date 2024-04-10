import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import ExerciseLog from "../src/screens/ExerciseLog"; // Adjust the import path as necessary
import * as habitService from "../src/services/habitService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mocks
jest.mock("../src/services/habitService", () => ({
    addHabit: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("ExerciseLog Page", () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        habitService.addHabit.mockClear();
        AsyncStorage.getItem.mockClear();
    });

    // Test if all components are rendered correctly
    it("renders all components correctly", () => {
        const { getByText, getByPlaceholderText } = render(
            <ExerciseLog navigation={{ navigate: jest.fn() }} />
        );

        expect(getByText("Add Workout")).toBeTruthy(); // Check for AddHabitButton

        // Check for all components
        // TODO: add assertions for actual components, add test id
        expect(getByPlaceholderText("Title")).toBeTruthy();
        expect(getByText("Duration")).toBeTruthy();
        expect(getByPlaceholderText("Description")).toBeTruthy();
        expect(getByText("Workout Type")).toBeTruthy();
        expect(getByText("Intensity")).toBeTruthy();
    });

    // Test if the title input updates the title state
    it("updates title state on input change", () => {
        const testTitle = "Morning Run";
        const { getByPlaceholderText } = render(
            <ExerciseLog navigation={{ navigate: jest.fn() }} />
        );

        // Assuming your TitleInput component has a placeholder text. If not, consider using getByTestId or another query method.
        const titleInput = getByPlaceholderText("Title"); // Adjust the placeholder text as per your component

        fireEvent.changeText(titleInput, testTitle);

        // Assert that the input's value has changed to what you've typed
        expect(titleInput.props.value).toBe(testTitle);
    });

    it("calls logExercise when Add Workout button is pressed", async () => {
        habitService.addHabit.mockResolvedValue(true); // Mock the addHabit service to resolve
        const navigateMock = jest.fn();

        const { getByText } = render(
            <ExerciseLog navigation={{ navigate: navigateMock }} />
        );
        const addButton = getByText("Add Workout");

        fireEvent.press(addButton);

        await waitFor(() => {
            expect(habitService.addHabit).toHaveBeenCalled();
            // Optionally, check if navigation was called to navigate back to the Exercise screen
            expect(navigateMock).toHaveBeenCalledWith("Exercise");
        });
    });
});
