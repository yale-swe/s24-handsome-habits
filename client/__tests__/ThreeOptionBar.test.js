import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ThreeOptionBar from "../src/components/ThreeOptionBar";

// Mock storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("Three Option Bar Component", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const selectedOption = "Option 2";
    const mockSetSelectedOption = jest.fn();

    const threeSetup = () => {
        const utils = render(
            <ThreeOptionBar
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={mockSetSelectedOption}
            />
        );
        return {
            ...utils,
        };
    };

    // Clear the mock before each test
    beforeEach(() => {
        mockSetSelectedOption.mockClear();
    });

    // Test if the component renders correctly
    it("renders correctly", () => {
        const { getByText, getAllByTestId } = threeSetup();
        options.forEach((option) => {
            expect(getByText(option)).toBeTruthy(); // check for each option
        });
        const buttons = getAllByTestId("touchableThree"); // get all three buttons
        expect(buttons.length).toBe(3); // check for three buttons
    });

    // Test that function is called correctly on press
    it("triggers onPress when pressed", () => {
        const { getAllByTestId } = threeSetup();

        const buttons = getAllByTestId("touchableThree"); // get all three buttons
        buttons.forEach((button) => {
            fireEvent.press(button); // press each button
        });
        expect(mockSetSelectedOption).toHaveBeenCalledTimes(buttons.length); // check that function is called correct times
    });

    // Test that the selected option is correctly updated
    it("updates selected option correctly", () => {
        const { getAllByTestId } = threeSetup();

        const buttons = getAllByTestId("touchableThree"); // get all three buttons
        buttons.forEach((button, index) => {
            fireEvent.press(button); // press each button
            expect(mockSetSelectedOption).toHaveBeenNthCalledWith(
                index + 1,
                options[index]
            ); // check that the function is called with the correct option
        });
    });
});
