import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getPointInfo() {
  try {
    const response = await Api.get("/points"); // GET request to find points
    const rawPoints = response.data.points;

    // Adds wellness and emotion values to the points object
    const userPoints = getQualityPoints(rawPoints);
    AsyncStorage.setItem("points", JSON.stringify(userPoints));

    return userPoints;
  } catch (err) {
    if (err?.response?.status == StatusCodes.UNAUTHORIZED) {
      logout(); // Session is expired/invalid, so logout
    }
  }
}

/**
 * @param {JSON} newPoints - The new points to update.
 * @newPoints could contain one or more of the following:
 * {
 *   coins: Number,
 *   exercise_points: Number,
 *   eating_points: Number,
 *   sleeping_points: Number,
 *   studying_points: Number
 * }
 * @returns {JSON} - The points data if updated correctly; otherwise, null.
 */
export async function updatePoints(newPoints) {
  try {
    // ensure that no points are non-negative and not over their maxium. if they are, reduce to maximum
    newPoints.exercise_points = Math.min(Math.max(newPoints.exercise_points,0), 26);
    newPoints.eating_points = Math.min(Math.max(newPoints.eating_points, 0), 25);
    newPoints.sleeping_points = Math.min(Math.max(newPoints.sleeping_points,0), 27);
    newPoints.studying_points = Math.min(Math.max(newPoints.studying_points, 0), 22);

    const response = await Api.post("/points/update", {
      points: newPoints,
    }); // Post request to update points

    // Save new points in client's local storage
    await AsyncStorage.setItem("points", JSON.stringify(response.data.points));

    return response.data.points;
  } catch (err) {
    if (err?.response && err?.response?.status == StatusCodes.UNAUTHORIZED) {
      logout(); // Session is expired/invalid, so logout
    }
    return null;
  }
}

/**
 * @description Update the points of a category by a specified amount.
 * @param {String} category - The category to update with pointChange.point; Eg. "Exercising", "Eating"...etc.
 * @param {JSON} pointChange - JSON object containing points change for category and coin change
 * Eg. { "points": 5, "coins": 3 }
 * @returns {JSON} - The updated points if successful; otherwise, null.
 */
export async function updatePointswithChange(category, pointChange) {
  const categoryPoints = categoryPointName(category.toLowerCase());
  let currentPoints = JSON.parse(await AsyncStorage.getItem("points"));
  if (currentPoints == null) {
    currentPoints = await getPointInfo();
  }

  currentPoints[categoryPoints] += pointChange.points;
  currentPoints.coins += pointChange.coins ? pointChange.coins : 0;
  return updatePoints(currentPoints);
}

/**
 * @param {*} points
 * @description Quality points are wellness and emotional points.
 * Get the wellness and emotional points of the user
 * @returns New points object, including the wellness and emotion values
 */
export const getQualityPoints = (points) => {
  const wellness =
    points.exercise_points +
    points.sleeping_points +
    points.eating_points +
    points.studying_points;

  // if wellness is max, slightly decrease it so
  // that the range of emotion is 0-2
  const emotion = Math.floor((wellness == 100 ? 99 : wellness) / 33.3);

  points.wellness_points = wellness;
  points.emotion_value = emotion;
  return points;
};

/** Returns the name of the given category's point in the database */
export const categoryPointName = (category) => {
  switch (category) {
    case "exercising":
      return "exercise_points";
    case "eating":
      return "eating_points";
    case "sleeping":
      return "sleeping_points";
    case "studying":
      return "studying_points";
    default:
      return "coins";
  }
};
