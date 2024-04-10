import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import TitleInput from "../src/components/TitleInput";

// Mock storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("Title Input Component", () => {
    const mockSetTitle = jest.fn();

    // Setup function to render the DurationSelect component
    const titleSetup = (title = "HELLO") => {
        const utils = render(
            <TitleInput value={title} onChangeText={mockSetTitle} />
        );
        const input = utils.getByPlaceholderText("Title");
        return {
            input,
            mockSetTitle,
            ...utils,
        };
    };

    // Clear the mock before each test
    beforeEach(() => {
        mockSetTitle.mockClear();
    });

    // Check if the title renders
    it("renders correctly", () => {
        const { input } = titleSetup();
        expect(input).toBeTruthy();
    });

    // Check if the title updates
    it("updates title on input change", () => {
        const { input } = titleSetup();

        fireEvent.changeText(input, "new title"); // simulate typing in the input
        expect(mockSetTitle).toHaveBeenCalledWith("new title"); // check that function is called
    });
});
