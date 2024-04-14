import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "../src/screens/home.js";
import { getPointInfo, getQualityPoints } from "../src/services/PointsService.js";
import { getEmotion, getEmotionPath, getClothesPath } from "../src/services/AppearanceService.js";
import { getLowestHabit, getExpression } from "../src/services/DansWordsService.js";
import Exercise from "../src/screens/exercise.js"
import SleepLog from "../src/screens/sleepLog.js"
import EatLog from "../src/screens/eatLog.js"
import StudyLog from "../src/screens/studyLog.js"

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mocking points service
jest.mock("../src/services/PointsService.js", () => ({
  getPointInfo: jest.fn().mockResolvedValue({
    eating_points: 23,
    sleeping_points: 25,
    studying_points: 10,
    exercise_points: 20,
  }),
  getQualityPoints: jest.fn().mockResolvedValue({
    wellness_points: 78,
    emotion_value: 1,
  })
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
    const { getByTestId } = render(<NavigationContainer> <Home navigation={{ navigate: jest.fn() }} /> </NavigationContainer>);

    // Check if the main home page view container is properly rendered
    expect(getByTestId("home-page")).toBeTruthy();
    // Check if the top buttons container is properly rendered
    expect(getByTestId("top-buttons")).toBeTruthy();
    // Check if the habit buttons container is properly rendered
    expect(getByTestId("habit-buttons")).toBeTruthy();
  });

  it("fetches user points", async () => {
    const mockPoints = { exercise_points: 26, eating_points: 25, sleeping_points: 27, studying_points: 23, wellness_points: 100, emotion_value: 4 }
    getPointInfo.mockResolvedValue(mockPoints);

    render(<NavigationContainer> <Home navigation={{ navigate: jest.fn() }}/> </NavigationContainer>);

    expect(getPointInfo).toHaveBeenCalled();
  });

  it("fetches dan's expression", async () => {
    const mockExpression = "You're doing great!";
    getExpression.mockResolvedValue(mockExpression);

    render(<NavigationContainer> <Home navigation={{ navigate: jest.fn() }}/> </NavigationContainer>);

    expect(getExpression).toHaveBeenCalled();
  });

  it("navigates to the exercise page", () => {
    const { getByTestId, getByText } = render(<NavigationContainer> <Home navigation={{navigate: jest.fn() }}/> <Exercise/> </NavigationContainer>);

    fireEvent.press(getByTestId("exercising-button"));
    expect(getByText("the grind doesn't stop."));
  })

  it("navigates to the sleeping page", () => {
    const { getByTestId, getByText } = render(<NavigationContainer> <Home navigation={{navigate: jest.fn() }}/> <SleepLog/> </NavigationContainer>);

    fireEvent.press(getByTestId("sleeping-button"));
    expect(getByText("Add Sleep"));
  })

  it("navigates to the eating page", () => {
    const { getByTestId, getByText } = render(<NavigationContainer> <Home navigation={{navigate: jest.fn() }}/> <EatLog/> </NavigationContainer>);

    fireEvent.press(getByTestId("eating-button"));
    expect(getByText("Add Meal"));
  })

  it("navigates to the studying page", () => {
    const { getByTestId, getByText } = render(<NavigationContainer> <Home navigation={{navigate: jest.fn() }}/> <StudyLog/> </NavigationContainer>);

    fireEvent.press(getByTestId("studying-button"));
    expect(getByText("Add Study Session"));
  })
});
