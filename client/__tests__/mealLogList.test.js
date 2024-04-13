import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MealLogList from "../src/components/mealLogList";
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

describe("MealLogList Component", () => {
    const sampleMeals = [
      { _id: "1", title: "Breakfast", date_and_time: "2022-05-10T08:30:00Z", details: { eating: { healthy_meal: true, eating_tag: "breakfast" } } },
      { _id: "2", title: "Lunch", date_and_time: "2022-05-10T12:00:00Z", details: { eating: { healthy_meal: false, eating_tag: "lunch" } } }
    ];

    it("renders meals correctly", () => {
      const { getAllByTestId } = render(<MealLogList meals={sampleMeals} />);
      const logItems = getAllByTestId(/^delete-/);
      expect(logItems.length).toBe(2);
    });

    it("handles no meals by showing empty message", () => {
      const { getByText } = render(<MealLogList meals={[]} />);
      expect(getByText("Your log is currently empty, my good pal! Get to it!")).toBeTruthy();
    });

    it("deletes a meal correctly", async () => {
      habitService.deleteHabit.mockResolvedValue(true);
      const { getByTestId, queryByText, rerender } = render(<MealLogList meals={sampleMeals} />);

      fireEvent.press(getByTestId("delete-Breakfast"));

      // Wait for state update
      await rerender(<MealLogList meals={sampleMeals.filter(meal => meal._id !== "1")} />);

      expect(queryByText("Breakfast")).toBeNull();
      expect(habitService.deleteHabit).toHaveBeenCalledWith("1");
    });

    it("assigns tags correctly based on healthiness", async () => {
        const { getByTestId } = render(<MealLogList meals={sampleMeals} />);

        // Retrieve each button by testID
        const breakfastButton = getByTestId("delete-Breakfast");
        const lunchButton = getByTestId("delete-Lunch");

        // Access and verify the button children for correct text content
        expect(breakfastButton.props.children).toContain("Delete Breakfast - Tags: healthy, breakfast");
        expect(lunchButton.props.children).toContain("Delete Lunch - Tags: lunch");
    });
  });
