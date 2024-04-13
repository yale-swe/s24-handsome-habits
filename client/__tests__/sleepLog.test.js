import React from "react";
import { fireEvent, render, act } from "@testing-library/react-native";
import SleepLog from "../src/screens/sleepLog";
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

describe("SleepLog Page", () => {
    const mockNavigate = jest.fn();

    const sleepSetup = () => {
        const utils = render(
            <SleepLog navigation={{ navigate: mockNavigate }} />
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
        const { getByText, getByTestId } = sleepSetup();

        // Check for all labels
        expect(getByText("Duration")).toBeTruthy();
        expect(getByText("Quality")).toBeTruthy();
        expect(getByText("Nap?")).toBeTruthy();
        expect(getByText("Time")).toBeTruthy();
        expect(getByText("Add Sleep")).toBeTruthy();

        // Check for all components
        expect(getByTestId("BackButton")).toBeTruthy();
        expect(getByTestId("TitleInput")).toBeTruthy();
        expect(getByTestId("TimeSelect")).toBeTruthy();
        expect(getByTestId("DurationSelect")).toBeTruthy();
        expect(getByTestId("ThreeOptionBar")).toBeTruthy();
        expect(getByTestId("DescriptionInput")).toBeTruthy();
        expect(getByTestId("AddHabitButton")).toBeTruthy();
    });

    // Test if the back button navigates back to the Sleep screen
    it("navigates back to Sleep screen on back button press", () => {
        const { getByTestId } = sleepSetup();

        const backButton = getByTestId("touchableBack");
        fireEvent.press(backButton); // click the button part of component
        expect(mockNavigate).toHaveBeenCalledWith("Sleep"); // check if navigate was called with correct argument
    });

    // Test if the logSleep function works correctly
    it("correctly logs sleep and navigates", async () => {
        const { getByTestId } = sleepSetup();

        // Assume you trigger logSleep via some UI interaction, e.g., pressing a "Log Sleep" button
        fireEvent.press(getByTestId("AddHabitButton"));

        await act(async () => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith("cookies"); // check async storage was called

            // Check addHabit was called with the expected newSleep object
            expect(habitService.addHabit).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: expect.any(String),
                    category_name: "Sleeping",
                })
            );
        });

        // Verify navigation
        expect(mockNavigate).toHaveBeenCalledWith("Sleep");
    });

    it("matches the snapshot", () => {
        const { toJSON } = sleepSetup();
        expect(toJSON()).toMatchSnapshot();
    });
});
