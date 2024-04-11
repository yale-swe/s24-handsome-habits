import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WorkoutLogList from "../src/components/workoutLogList";
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

describe("WorkoutLogList Component", () => {
    const sampleWorkouts = [
      { _id: "1", title: "Morning Cardio", date_and_time: "2022-05-10T08:30:00Z", details: { workout: { workout_duration: 45, workout_tag: "cardio", workout_intensity: "high" } } },
      { _id: "2", title: "Evening Yoga", date_and_time: "2022-05-10T18:00:00Z", details: { workout: { workout_duration: 30, workout_tag: "yoga", workout_intensity: "low" } } }
    ];

    it("renders workouts correctly", () => {
      const { getAllByTestId } = render(<WorkoutLogList workouts={sampleWorkouts} />);
      const logItems = getAllByTestId(/^delete-/);
      expect(logItems.length).toBe(2);
    });

    it("handles no workouts by showing empty message", () => {
      const { getByText } = render(<WorkoutLogList workouts={[]} />);
      expect(getByText("Your log is currently empty, my good pal! Get to it!")).toBeTruthy();
    });

    it("deletes a workout correctly", async () => {
      habitService.deleteHabit.mockResolvedValue(true);
      const { getByTestId, queryByText, rerender } = render(<WorkoutLogList workouts={sampleWorkouts} />);

      fireEvent.press(getByTestId("delete-Morning Cardio"));

      // Wait for state update
      await rerender(<WorkoutLogList workouts={sampleWorkouts.filter(workout => workout._id !== "1")} />);

      expect(queryByText("Morning Cardio")).toBeNull();
      expect(habitService.deleteHabit).toHaveBeenCalledWith("1");
    });
  });
