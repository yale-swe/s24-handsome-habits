import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LogItem from "../src/components/LogItem";

jest.mock("react-native-vector-icons/MaterialCommunityIcons", () => "Icon");

beforeAll(() => {
    jest.useFakeTimers("modern");
});

afterAll(() => {
    jest.useRealTimers();
});

describe("LogItem Component", () => {
    const mockOnDelete = jest.fn();
    const props = {
      title: "Morning Run",
      duration: 30,
      duration_unit: "minutes",
      tags: ["fitness", "health"],
      onDelete: mockOnDelete
    };

    it.each([
      { time: "2020-07-03T09:00:00Z", expectedDate: "Today, 05:00 AM" }, // test time matches mock set time
      { time: "2020-07-02T09:00:00Z", expectedDate: "Yesterday, 05:00 AM" },
      { time: "2020-06-30T09:00:00Z", expectedDate: "Jun 30, 05:00 AM" }
    ])("renders correctly with different times", ({ time, expectedDate }) => {
      jest.setSystemTime(new Date(2020, 6, 3, 9)); // Mock system time

      const { getByText } = render(<LogItem {...props} time={time} />);
      expect(getByText("Morning Run")).toBeTruthy();
      expect(getByText(`${props.duration} ${props.duration_unit} | ${expectedDate}`)).toBeTruthy();
      props.tags.forEach(tag => {
        expect(getByText(tag.toLowerCase())).toBeTruthy();
      });
    });

    it("displays only time if duration is null", () => {
      const modifiedProps = { ...props, duration: null, time: "2020-07-03T09:00:00Z" };
      jest.setSystemTime(new Date(2020, 6, 3, 9));
      const { getByText } = render(<LogItem {...modifiedProps} />);
      expect(getByText("Today, 05:00 AM")).toBeTruthy();
    });

    it("calls onDelete when delete button is pressed", () => {
      const { getByTestId } = render(<LogItem {...props} time="2020-07-03T09:00:00Z" />);

      const deleteButton = getByTestId("deleteButton");
      fireEvent.press(deleteButton);

      expect(mockOnDelete).toHaveBeenCalled();
    });
});
