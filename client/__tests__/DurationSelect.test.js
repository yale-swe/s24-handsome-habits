import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import ExerciseLog from "../src/screens/ExerciseLog"; // Adjust the import path as necessary
import * as habitService from "../src/services/habitService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mocks

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("Duration Select Component", () => {

    // Test if the duration button updates the duration state
    const durationSetup = () => {
        const utils = render(<ExerciseLog navigation={{ navigate: jest.fn() }} />);
        const incrementButton = utils.getByText("+");
        const decrementButton = utils.getByText("-");
        const input = utils.getByTestId("durationInput");
        return {
            incrementButton,
            decrementButton,
            input,
            ...utils,
        };
    };

    // Test if the displayed duration changes on input
    it("updates duration display on input change", () => {

        const { input } = durationSetup();
        const testDuration = "50";

        fireEvent.changeText(input, testDuration);

        // Assert that the input's value has changed to what you've typed
        expect(input.props.value).toBe(testDuration);
    });

    // Test that displayed duration is 0 on invalid input
    it("does not update duration display on invalid input", () => {

        const { input } = durationSetup();

        fireEvent.changeText(input, "abc"); // letters invalid
        expect(input.props.value).toBe("0"); // assert that the input's value is set to 0

        fireEvent.changeText(input, "a02b"); // letters invalid
        expect(input.props.value).toBe("0"); // assert that the input's value is set to 0

        fireEvent.changeText(input, "-10"); // negative invalid
        expect(input.props.value).toBe("0"); // assert that the input's value is set to 0

        fireEvent.changeText(input, "100000"); // high number invalid (above max)
        expect(input.props.value).toBe("0"); // assert that the input's value is set to 0

    });


    // Test if the displayed duration changes on button press
    it("increments and decrements duration display correctly", () => {
        const { incrementButton, decrementButton, getByDisplayValue } = durationSetup();

        fireEvent.press(incrementButton); // increment from 0
        expect(getByDisplayValue("5")).toBeTruthy();

        fireEvent.press(decrementButton); // decrement from 5
        expect(getByDisplayValue("0")).toBeTruthy();

        fireEvent.press(decrementButton); // decrement from 0 (should not go below 0)
        expect(getByDisplayValue("0")).toBeTruthy();

    });

    // Test if the displayed duration changes on button press after input change
    it("increments and decrements duration display correctly after input change", () => {
        const { incrementButton, decrementButton, input, getByDisplayValue } = durationSetup();

        fireEvent.changeText(input, "50");

        fireEvent.press(incrementButton); // increment from 50
        expect(getByDisplayValue("55")).toBeTruthy();

        fireEvent.press(decrementButton); // decrement from 55
        expect(getByDisplayValue("50")).toBeTruthy();

    });

});

