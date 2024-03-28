import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const response = await Api.post("/points", {
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