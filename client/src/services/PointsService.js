import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getPointInfo(user_id) {
    try {
        const response = await Api.get("/points"); // GET request to find points
        
        const rawPoints = response.data;
        
        const wellness = rawPoints.points.exercise_points +
                         rawPoints.points.sleeping_points +
                         rawPoints.points.eating_points +
                         rawPoints.points.studying_points;
        
        // if wellness is max, slightly decrease it so
        // that the range of emotion is 0-4
        wellness = wellness == 100 ? 99 : wellness;

        const emotion = Math.floor(wellness / 20);

        rawPoints.points.wellness_points = wellness;
        rawPoints.points.emotion_value = emotion;

        return rawPoints;

    } catch(err) {
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
 * @returns {} - The user data if found; otherwise, null.
 */
export async function updatePoints(newPoints) {
    try {
        const response = await Api.post("/points/update", {
            points: newPoints,
        }); // Post request to update points

        // Save new points in client's local storage
        AsyncStorage["points"] = JSON.stringify(response.data);

        return response.data;
    } catch (err) {
        if (err.response.status == StatusCodes.UNAUTHORIZED) {
            logout(); // Session is expired/invalid, so logout
        }
        return null;
    }
}