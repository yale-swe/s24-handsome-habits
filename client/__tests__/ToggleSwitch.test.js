import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ToggleSwitch from "../src/components/ToggleSwitch";

// Mock storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("Toggle Switch Component", () => {
    const mockSetToggle = jest.fn();

    const toggleSetup = (isToggle = false) => {
        const utils = render(
            <ToggleSwitch isToggle={isToggle} setToggle={mockSetToggle} />
        );
        const button = utils.getByTestId("touchableToggle");

        return {
            ...utils,
            button,
            mockSetToggle,
        };
    };

    it("renders correctly", () => {
        const { button } = toggleSetup();
        expect(button).toBeTruthy();
    });

    it("changes to true if false", () => {
        const { button, mockSetToggle } = toggleSetup();

        fireEvent.press(button);
        expect(mockSetToggle).toHaveBeenCalledWith(true); // check that function is called with true
    });

    it("changes to false if true", () => {
        const { button, mockSetToggle } = toggleSetup(true);

        fireEvent.press(button);
        expect(mockSetToggle).toHaveBeenCalledWith(false); // check that function is called with false
    });
});
