import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SleepLogList from "../src/components/sleepLogList"; // Adjust the path as necessary
import * as habitService from "../src/services/habitService";

jest.mock("../src/components/LogItem", () => function MockLogItem(props) {
    return (
        <button
            // eslint-disable-next-line
            onPress={props.onDelete}
            // eslint-disable-next-line
            testID={`delete-${props.title}`}
            // eslint-disable-next-line
            children={`Delete ${props.title} - Tags: ${props.tags.join(", ")}`}
        />
    );
});

jest.mock("../src/services/habitService", () => ({
  deleteHabit: jest.fn()
}));

describe("SleepLogList Component", () => {
    const sampleSleepSessions = [
      { _id: "1", title: "Night Sleep", date_and_time: "2022-05-10T22:00:00Z", details: { sleep: { sleep_duration: 8, is_nap: false, quality_of_sleep: "good" } } },
      { _id: "2", title: "Afternoon Nap", date_and_time: "2022-05-10T14:00:00Z", details: { sleep: { sleep_duration: 2, is_nap: true, quality_of_sleep: "refreshing" } } }
    ];

    it("renders sleep sessions correctly", () => {
      const { getAllByTestId } = render(<SleepLogList sleep={sampleSleepSessions} />);
      const logItems = getAllByTestId(/^delete-/);
      expect(logItems.length).toBe(2);
    });

    it("handles no sleep sessions by showing empty message", () => {
      const { getByText } = render(<SleepLogList sleep={[]} />);
      expect(getByText("Your log is currently empty, my good pal! Get to it!")).toBeTruthy();
    });

    it("deletes a sleep session correctly", async () => {
      habitService.deleteHabit.mockResolvedValue(true);
      const { getByTestId, queryByText, rerender } = render(<SleepLogList sleep={sampleSleepSessions} />);

      fireEvent.press(getByTestId("delete-Night Sleep"));

      await rerender(<SleepLogList sleep={sampleSleepSessions.filter(sleep => sleep._id !== "1")} />);

      expect(queryByText("Night Sleep")).toBeNull();
      expect(habitService.deleteHabit).toHaveBeenCalledWith("1");
    });

    it("assigns tags correctly based on sleep session properties", async () => {
        const { getByTestId } = render(<SleepLogList sleep={sampleSleepSessions} />);

        // Retrieve each button by testID
        const nightSleepButton = getByTestId("delete-Night Sleep");
        const afternoonNapButton = getByTestId("delete-Afternoon Nap");

        // Access and verify the button children for correct text content
        expect(nightSleepButton.props.children).toContain("Delete Night Sleep - Tags: good");
        expect(afternoonNapButton.props.children).toContain("Delete Afternoon Nap - Tags: nap, refreshing");
    });
});
