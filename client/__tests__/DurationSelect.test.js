import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DurationSelect from "../src/components/DurationSelect";

// Mock storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("Duration Select Component", () => {


    const mockSetDuration = jest.fn();

    // Setup function to render the DurationSelect component
    const durationSetup = (initialDuration = "0") => {
        const utils = render(
            <DurationSelect
                label="minutes"
                increment={5}
                min={0}
                max={60}
                duration={initialDuration}
                setDuration={mockSetDuration}
            />
        );
        const incrementButton = utils.getByText("+");
        const decrementButton = utils.getByText("-");
        const input = utils.getByTestId("durationInput");
        return {
            incrementButton,
            decrementButton,
            input,
            mockSetDuration,
            ...utils,
        };
    };

    // Function to simulate parent component behavior and re-render DurationSelect
    const updateAndRerenderDuration = (rerender, newDuration) => {
        rerender(
            <DurationSelect
                increment={5}
                min={0}
                max={60}
                duration={newDuration}
                setDuration={mockSetDuration}
            />
        );
    };

    // Clear the mock before each test
    beforeEach(() => {
        mockSetDuration.mockClear();
    });

    it("renders correctly", () => {
        const { getByText, getByTestId } = durationSetup();
        expect(getByText("+")).toBeTruthy();
        expect(getByText("-")).toBeTruthy();
        expect(getByTestId("durationInput")).toBeTruthy();
    });

    // Test that functions are called on valid input change
    it("updates duration display and calls function on input change", () => {
        const { input, mockSetDuration } = durationSetup();

        fireEvent.changeText(input, "15");
        expect(mockSetDuration).toHaveBeenCalledWith("15"); // function called with new duration

        fireEvent.changeText(input, "60"); // number at max
        expect(mockSetDuration).toHaveBeenCalledWith("60"); // function called with new duration

        fireEvent.changeText(input, "0"); // number at min
        expect(mockSetDuration).toHaveBeenCalledWith("0"); // function called with new duration
    });

    // Test that functions are called on 0 on invalid input
    it("does not update duration display on invalid input", () => {
        const { input, mockSetDuration } = durationSetup();

        fireEvent.changeText(input, "abc"); // letters invalid
        expect(mockSetDuration).toHaveBeenCalledWith("0");

        fireEvent.changeText(input, "a02b"); // letters invalid
        expect(mockSetDuration).toHaveBeenCalledWith("0");

        fireEvent.changeText(input, "-10"); // number below min invalid
        expect(mockSetDuration).toHaveBeenCalledWith("0");

        fireEvent.changeText(input, "65"); // number above max invalid
        expect(mockSetDuration).toHaveBeenCalledWith("0");
    });

    // Test that functions are called on button press
    it("increments and decrements duration display correctly", () => {
        const { incrementButton, decrementButton, mockSetDuration } =
            durationSetup("5");

        fireEvent.press(incrementButton); // increment from 5
        expect(mockSetDuration).toHaveBeenCalledWith("10");

        fireEvent.press(decrementButton); // decrement from 5
        expect(mockSetDuration).toHaveBeenCalledWith("0");
    });

    // Test that functions are called on min/max for too low/high values
    it("does not decrement below min and increment above max", () => {
        // set up for max test
        const { incrementButton, decrementButton, mockSetDuration, rerender } =
            durationSetup("60");

        fireEvent.press(incrementButton); // increment from 60
        expect(mockSetDuration).toHaveBeenCalledWith("60");

        // set up for min test
        updateAndRerenderDuration(rerender, "0");

        fireEvent.press(decrementButton); // decrement from 0
        expect(mockSetDuration).toHaveBeenCalledWith("0");
    });

    // Test that functions are called on button press after input change
    it("increments and decrements duration display after input change", () => {
        const {
            incrementButton,
            decrementButton,
            input,
            mockSetDuration,
            rerender,
        } = durationSetup();

        fireEvent.changeText(input, "15"); // change input to 15

        expect(mockSetDuration).toHaveBeenCalledWith("15");
        updateAndRerenderDuration(rerender, "15");

        fireEvent.press(incrementButton); // increment from 15
        expect(mockSetDuration).toHaveBeenCalledWith("20");
        updateAndRerenderDuration(rerender, "20");

        fireEvent.press(decrementButton); // decrement from 15
        expect(mockSetDuration).toHaveBeenCalledWith("15");
    });
});
