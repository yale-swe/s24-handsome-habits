import React from "react";
import { fireEvent, render, act } from "@testing-library/react-native";
import EatLog from "../src/screens/eatLog";
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

describe("EatLog Page", () => {
    const mockNavigate = jest.fn();

    const eatSetup = () => {
        const utils = render(
            <EatLog navigation={{ navigate: mockNavigate }} />
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
        const { getByText, getByTestId } = eatSetup();

        // Check for all labels
        expect(getByText("Healthy?")).toBeTruthy();
        expect(getByText("Meal Type")).toBeTruthy();
        expect(getByText("Time")).toBeTruthy();
        expect(getByText("Add Meal")).toBeTruthy();

        // Check for all components
        expect(getByTestId("BackButton")).toBeTruthy();
        expect(getByTestId("TitleInput")).toBeTruthy();
        expect(getByTestId("TimeSelect")).toBeTruthy();
        expect(getByTestId("HorizontalSelect")).toBeTruthy();
        expect(getByTestId("DescriptionInput")).toBeTruthy();
        expect(getByTestId("AddHabitButton")).toBeTruthy();
    });

    // Test if the back button navigates back to the Eat screen
    it("navigates back to Eat screen on back button press", () => {
        const { getByTestId } = eatSetup();

        const backButton = getByTestId("touchableBack");
        fireEvent.press(backButton); // click the button part of component
        expect(mockNavigate).toHaveBeenCalledWith("Eat"); // check if navigate was called with correct argument
    });

    // Test if the logEat function works correctly
    it("correctly logs eat and navigates", async () => {
        const { getByTestId } = eatSetup();

        // Assume you trigger logEat via some UI interaction, e.g., pressing a "Log Eat" button
        fireEvent.press(getByTestId("AddHabitButton"));

        await act(async () => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith("cookies"); // check async storage was called

            // Check addHabit was called with the expected newEat object
            expect(habitService.addHabit).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: expect.any(String),
                    category_name: "Eating",
                })
            );
        });

        // Verify navigation
        expect(mockNavigate).toHaveBeenCalledWith("Eat");
    });

    it("matches the snapshot", () => {
        const { toJSON } = eatSetup();
        expect(toJSON()).toMatchSnapshot();
    });
});
