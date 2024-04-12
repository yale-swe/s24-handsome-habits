import React from "react";
import { fireEvent, render, act } from "@testing-library/react-native";
import ExerciseLog from "../src/screens/exerciseLog";
import * as habitService from "../src/services/habitService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mocks
jest.mock("../src/services/habitService", () => ({
    addHabit: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

jest.mock("axios", () => ({
    defaults: {
        headers: { Cookie: "" },
    },
}));

describe("ExerciseLog Page", () => {
    const mockNavigate = jest.fn();

    const exerciseSetup = () => {
        const utils = render(
            <ExerciseLog navigation={{ navigate: mockNavigate }} />
        );
        return {
            ...utils,
        };
    };

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        habitService.addHabit.mockClear();
        AsyncStorage.getItem.mockClear();
        mockNavigate.mockClear();
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(2020, 3, 1, 9, 30));
    });

    // Test if all components are rendered correctly
    it("renders all components correctly", () => {
        const { getByText, getByTestId } = exerciseSetup();

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

    // Test if the back button navigates back to the Exercise screen
    it("navigates back to Exercise screen on back button press", () => {
        const { getByTestId } = exerciseSetup();

        const backButton = getByTestId("touchableBack");
        fireEvent.press(backButton); // click the button part of component
        expect(mockNavigate).toHaveBeenCalledWith("Exercise"); // check if navigate was called with correct argument
    });

    // Test if the logExercise function works correctly
    it("correctly logs exercise and navigates", async () => {
        const { getByTestId } = exerciseSetup();

        // Assume you trigger logExercise via some UI interaction, e.g., pressing a "Log Exercise" button
        fireEvent.press(getByTestId("AddHabitButton"));

        await act(async () => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith("cookies"); // check async storage was called

            // Check addHabit was called with the expected newExercise object
            expect(habitService.addHabit).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: expect.any(String),
                    category_name: "Exercising",
                })
            );
        });

        // Verify navigation
        expect(mockNavigate).toHaveBeenCalledWith("Exercise");
    });

    it("matches the snapshot", () => {
        const { toJSON } = exerciseSetup();
        expect(toJSON()).toMatchSnapshot();
    });
});
