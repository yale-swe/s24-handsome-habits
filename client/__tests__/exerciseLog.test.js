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
        const { getByText, getByTestId } = render(
            <ExerciseLog navigation={{ navigate: jest.fn() }} />
        );

        expect(getByText("Add Workout")).toBeTruthy(); // Check for AddHabitButton

        // Check for all labels
        expect(getByText("Duration")).toBeTruthy();
        expect(getByText("Workout Type")).toBeTruthy();
        expect(getByText("Intensity")).toBeTruthy();
        expect(getByText("Time")).toBeTruthy();
        expect(getByText("Add Workout")).toBeTruthy();

        // Check for all components
        expect(getByTestId("BackButton")).toBeTruthy();
        expect(getByTestId("TitleInput")).toBeTruthy();
        expect(getByTestId("TimeSelect")).toBeTruthy();
        expect(getByTestId("DurationSelect")).toBeTruthy();
        expect(getByTestId("HorizontalSelect")).toBeTruthy();
        expect(getByTestId("ThreeOptionBar")).toBeTruthy();
        expect(getByTestId("DescriptionInput")).toBeTruthy();
        expect(getByTestId("AddHabitButton")).toBeTruthy();

    });

    // Test if the title input updates the title state
    it("updates title state on input change", () => {
        const testTitle = "Morning Run";
        const { getByPlaceholderText } = render(
            <ExerciseLog navigation={{ navigate: jest.fn() }} />
        );

        const titleInput = getByPlaceholderText("Title"); // Get the input by placeholder text
        fireEvent.changeText(titleInput, testTitle); // Simulate typing in the input
        expect(titleInput.props.value).toBe(testTitle); // Check if the input value is updated
    });

    // it("calls logExercise when Add Workout button is pressed", async () => {
    //     habitService.addHabit.mockResolvedValue(true); // Mock the addHabit service to resolve
    //     const navigateMock = jest.fn();

    //     const { getByText } = render(
    //         <ExerciseLog navigation={{ navigate: navigateMock }} />
    //     );
    //     const addButton = getByText("Add Workout");

    //     fireEvent.press(addButton);

    //     await waitFor(() => {
    //         expect(habitService.addHabit).toHaveBeenCalled();
    //         // Optionally, check if navigation was called to navigate back to the Exercise screen
    //         expect(navigateMock).toHaveBeenCalledWith("Exercise");
    //     });
    // });
});
