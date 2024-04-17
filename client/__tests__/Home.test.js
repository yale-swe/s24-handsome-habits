import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "../src/screens/home.js";
import { getPointInfo } from "../src/services/PointsService.js";
import { getExpression } from "../src/services/DansWordsService.js";
import Exercise from "../src/screens/exercise.js";
import Sleep from "../src/screens/sleep.js";
import Eat from "../src/screens/eat.js";
import Study from "../src/screens/study.js";

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mocking points service
jest.mock("../src/services/PointsService.js", () => ({
  getPointInfo: jest.fn().mockResolvedValue({
    eating_points: 23,
    sleeping_points: 25,
    studying_points: 10,
    exercise_points: 20,
    wellness_points: 78,
    emotion_value: 2,
  }),
  getQualityPoints: jest.fn().mockResolvedValue({
    wellness_points: 78,
    emotion_value: 1,
  }),
}));

// Mocking appearance service
jest.mock("../src/services/AppearanceService.js", () => ({
  getEmotion: jest.fn().mockResolvedValue(1),
  getEmotionPath: jest.fn().mockReturnValue("happy_face"),
  getClothesPath: jest.fn().mockReturnValue({
    top: "white_tshirt",
    bottom: "white_pants",
    accessories: null,
  }),
}));

// Mocking dan's words service
jest.mock("../src/services/DansWordsService.js", () => ({
  getExpression: jest.fn(),
}));

describe("Home component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<NavigationContainer> <Home navigation={{ navigate: jest.fn() }} /> </NavigationContainer>,);

    // Check if the main home page view container is properly rendered
    expect(getByTestId("home-page")).toBeTruthy();
    // Check if the top buttons container is properly rendered
    expect(getByTestId("top-buttons")).toBeTruthy();
    // Check if the habit buttons container is properly rendered
    expect(getByTestId("habit-buttons")).toBeTruthy();
  });

  it("fetches user points", async () => {
    const mockPoints = {
      exercise_points: 26,
      eating_points: 25,
      sleeping_points: 27,
      studying_points: 23,
      wellness_points: 100,
      emotion_value: 4,
    };
    getPointInfo.mockResolvedValue(mockPoints);

    render(
      <NavigationContainer> <Home navigation={{ navigate: jest.fn() }} /> </NavigationContainer>,
    );
    expect(getPointInfo).toHaveBeenCalled();
  });

  it("fetches dan's expression", async () => {
    const mockExpression = "You're doing great!";
    getExpression.mockResolvedValue(mockExpression);

    render(<NavigationContainer> <Home navigation={{ navigate: jest.fn() }} /> </NavigationContainer>,);

    expect(getExpression).toHaveBeenCalled();
  });

  it("navigates to the exercise page", () => {
    const { getByTestId, getByText } = render(<NavigationContainer> <Home navigation={{ navigate: jest.fn() }} /> <Exercise /> </NavigationContainer>,);

    fireEvent.press(getByTestId("exercising-button"));
    expect(getByText("Log a Workout"));
  });

  it("navigates to the sleeping page", () => {
    const { getByTestId, getByText } = render(<NavigationContainer> <Home navigation={{navigate: jest.fn() }}/> <Sleep/> </NavigationContainer>);

    fireEvent.press(getByTestId("sleeping-button"));
    expect(getByText("recharge to upcharge."));
  })

  it("navigates to the eating page", () => {
    const { getByTestId, getByText } = render(<NavigationContainer> <Home navigation={{navigate: jest.fn() }}/> <Eat/> </NavigationContainer>);

    fireEvent.press(getByTestId("eating-button"));
    expect(getByText("eat better, feel better."));
  })

  it("navigates to the studying page", () => {
    const { getByTestId, getByText } = render(<NavigationContainer> <Home navigation={{navigate: jest.fn() }}/> <Study/> </NavigationContainer>);

    fireEvent.press(getByTestId("studying-button"));
    expect(getByText("study smart, not hard."));
  })
});
