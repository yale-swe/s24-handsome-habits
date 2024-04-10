import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import TimeSelect from "../src/components/TimeSelect";
import MockDate from "mockdate";

// Mock storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

// Mock react-native-date-picker
jest.mock("react-native-date-picker", () => {
    const mockDatePicker = (props) => {
        return (
            <mock-DatePicker
                testID="mockDatePicker"
                {...props}
                onConfirm={() => props.onConfirm(new Date())}
                onCancel={props.onCancel}
            />
        );
    };
    return mockDatePicker;
});

describe("Time Select Component", () => {
    // setup
    const timeSetup = (openBool = false) => {
        const date = new Date("2021-01-01T12:00:00Z");
        const open = openBool;
        const mockDateIsConfirmed = false;
        const testID = "TimeSelect";
        const mockSetDate = jest.fn();
        const mockSetOpen = jest.fn();
        const mockSetIsConfirmed = jest.fn();

        const utils = render(
            <TimeSelect
                date={date}
                setDate={mockSetDate}
                open={open}
                setOpen={mockSetOpen}
                dateIsConfirmed={mockDateIsConfirmed}
                setIsConfirmed={mockSetIsConfirmed}
                testID={testID}
            />
        );

        return {
            mockSetDate,
            mockSetOpen,
            mockSetIsConfirmed,
            mockDateIsConfirmed,
            ...utils,
        };
    };

    // set to fixed date for consistent testing
    beforeAll(() => {
        MockDate.set(new Date("2021-01-01T12:00:00Z"));
    });

    // renders with the correct initial time
    it("renders correctly with initial time", () => {

        const { getByTestId, getByText } = timeSetup();
        expect(getByTestId("TimeSelect")).toBeTruthy(); // check component
        expect(getByText("7:00am")).toBeTruthy(); // check correct time
    });

    // without open modal, tests if button works
    it("opens the date picker modal when pressed", () => {
        const { getByTestId, mockSetOpen } = timeSetup(false);

        fireEvent.press(getByTestId("touchableTime")); // press the button

        expect(mockSetOpen).toHaveBeenCalledWith(true); // should be set to open
    });

    // // with open modal, tests if confirm works
    // it("updates the time and confirms on date selection", () => {
    //     // render with mock functions
    //     const { getByTestId, mockSetOpen, mockSetDate, mockSetIsConfirmed } = timeSetup(true);

    //     fireEvent(
    //         getByTestId("mockDatePicker"),
    //         "onConfirm",
    //         new Date("2021-01-01T12:00:00Z")
    //     ); // confirm date

    //     expect(mockSetOpen).toHaveBeenCalledWith(false); // should be set to close
    //     expect(mockSetDate).toHaveBeenCalledWith(
    //         new Date("2021-01-01T12:00:00Z")
    //     ); // should be called with new date
    //     expect(mockSetIsConfirmed).toHaveBeenCalledWith(true); // should be set to true
    // });

    // with open modal, tests if cancel works
    it("cancels the date selection", () => {
        // render with mock functions
        const { getByTestId, mockSetOpen, mockSetDate, mockSetIsConfirmed } =
            timeSetup(true);

        fireEvent(getByTestId("mockDatePicker"), "onCancel"); // cancel modal

        expect(mockSetOpen).toHaveBeenCalledWith(false); // should be set to close
        expect(mockSetIsConfirmed).toHaveBeenCalledWith(false); // should be set to false
        expect(mockSetDate).toHaveBeenCalledTimes(0); // should not be called
    });

});
