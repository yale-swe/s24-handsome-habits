import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DescriptionInput from "../src/components/DescriptionInput";

// Mock storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

describe("Description Input Component", () => {
    const mockSetDescription = jest.fn();

    // Setup function to render the DurationSelect component
    const descriptionSetup = (description = "I love a good description") => {
        const utils = render(
            <DescriptionInput
                value={description}
                onChangeText={mockSetDescription}
            />
        );
        const input = utils.getByPlaceholderText("Description");
        return {
            input,
            mockSetDescription,
            ...utils,
        };
    };

    // Clear the mock before each test
    beforeEach(() => {
        mockSetDescription.mockClear();
    });

    // Check if the description renders
    it("renders correctly", () => {
        const { input } = descriptionSetup();
        expect(input).toBeTruthy(); // check if the input box is rendered
    });

    // Check if the description updates
    it("updates description on input change", () => {
        const { input, mockSetDescription } = descriptionSetup();

        fireEvent.changeText(input, "new description"); // simulate typing in the input
        expect(mockSetDescription).toHaveBeenCalledWith("new description"); // check that function is called
    });
});
