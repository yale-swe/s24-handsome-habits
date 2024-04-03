import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getPointInfo() {
    try {
        const response = await Api.get("/points"); // GET request to find points

        const rawPoints = response.data.points;

        // let wellness = rawPoints.exercise_points +
        //                  rawPoints.sleeping_points +
        //                  rawPoints.eating_points +
        //                  rawPoints.studying_points;

        // // if wellness is max, slightly decrease it so
        // // that the range of emotion is 0-4
        // wellness = wellness == 100 ? 99 : wellness;


        // Adds wellness and emotion values to the points object
        const userPoints = getQualityPoints(rawPoints);
        AsyncStorage.setItem("points", JSON.stringify(userPoints));

        return userPoints;
    } catch (err) {
        if (err.response.status == StatusCodes.UNAUTHORIZED) {
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
        newPoints.exercise_points = Math.min(newPoints.exercise_points, 26);
        newPoints.eating_points = Math.min(newPoints.eating_points, 25);
        newPoints.sleeping_points = Math.min(newPoints.sleeping_points, 27);
        newPoints.studying_points = Math.min(newPoints.studying_points, 22);

        const response = await Api.post("/points/update", {
            points: newPoints,
        }); // Post request to update points

        // Save new points in client's local storage
        AsyncStorage.setItem("points", JSON.stringify(response.data));

        return response.data;
    } catch (err) {
        if (err.response.status == StatusCodes.UNAUTHORIZED) {
            logout(); // Session is expired/invalid, so logout
        }
        return null;
    }
}

/**
 * @description Update the points of a category by a specified amount.
 * @param {String} category - The category to update.
 * @param {Number} pointChange - The change in points.
 * @returns {JSON} - The updated points if successful; otherwise, null.
 */
export async function updatePointswithChange(category, pointChange) {
    let categoryPoints = categoryPointName(category);
    let currentPoints = AsyncStorage.getItem("points");

    if (currentPoints == null) {
        currentPoints = await getPointInfo();
    }

    currentPoints[categoryPoints] += pointChange;

    return updatePoints(currentPoints);
}

/**
 * @param {*} points
 * @description Quality points are wellness and emotional points.
 * Get the wellness and emotional points of the user
 * @returns New points object, including the wellness and emotion values
 */
export const getQualityPoints = (points) => {
    let wellness =
        points.exercise_points +
        points.sleeping_points +
        points.eating_points +
        points.studying_points;

    // if wellness is max, slightly decrease it so
    // that the range of emotion is 0-4
    wellness = wellness == 100 ? 99 : wellness;

    const emotion = Math.floor(wellness / 20);

    points.wellness_points = wellness;
    points.emotion_value = emotion;
    return points;
};

// toLower the category name and concatenate with "_points"
/** Returns the name of the category point in the database */
const categoryPointName = (category) => {
    switch (category) {
        case "exercise":
            return "exercise_points";
        case "eating":
            return "eating_points";
        case "sleeping":
            return "sleeping_points";
        case "studying":
            return "studying_points";
        default:
            return null;
    }
};