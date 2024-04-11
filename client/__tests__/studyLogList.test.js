import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import StudyLogList from "../src/components/studyLogList"; // Adjust the path as necessary
import * as habitService from "../src/services/habitService";

jest.mock("../src/components/LogItem", () => function MockLogItem(props) {
    return (
        // eslint-disable-next-line
        <button onPress={props.onDelete} testID={`delete-${props.title}`}>
            Delete {props.title}
        </button>
    );
});
jest.mock("../src/services/habitService", () => ({
  deleteHabit: jest.fn()
}));

describe("StudyLogList Component", () => {
    const sampleStudies = [
      { _id: "1", title: "Math Revision", date_and_time: "2022-05-10T10:00:00Z", details: { study: { study_duration: 120, study_productivity: "high" } } },
      { _id: "2", title: "Literature Essay", date_and_time: "2022-05-10T15:00:00Z", details: { study: { study_duration: 90, study_productivity: "medium" } } }
    ];

    it("renders study sessions correctly", () => {
      const { getAllByTestId } = render(<StudyLogList study={sampleStudies} />);
      const logItems = getAllByTestId(/^delete-/);
      expect(logItems.length).toBe(2);
    });

    it("handles no study sessions by showing empty message", () => {
      const { getByText } = render(<StudyLogList study={[]} />);
      expect(getByText("Your log is currently empty, my good pal! Get to it!")).toBeTruthy();
    });

    it("deletes a study session correctly", async () => {
      habitService.deleteHabit.mockResolvedValue(true);
      const { getByTestId, queryByText, rerender } = render(<StudyLogList study={sampleStudies} />);

      fireEvent.press(getByTestId("delete-Math Revision"));

      // Wait for state update
      await rerender(<StudyLogList study={sampleStudies.filter(study => study._id !== "1")} />);

      expect(queryByText("Math Revision")).toBeNull();
      expect(habitService.deleteHabit).toHaveBeenCalledWith("1");
    });
  });
