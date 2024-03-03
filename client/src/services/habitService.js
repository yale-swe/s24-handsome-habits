import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Adds a new habit for the user.
 * @param {JSON} newExercise - The new habit to add. 
 * newExercise could contain, but is not limited to:
 * { 
 *   title: String, 
 *   time: Date,
 *   duration: Number,
 *   type: Date, 
 *   intensity: String,
 *   description: String,
 * }
 * @returns {JSON|null} - The added habit data if successful; otherwise, null.
 */
export async function addExercise(newExercise) {
    try {
        const response = await Api.post("/habits/exercise/add", {
            habit: newExercise,
        }); // Post request to add a new exercise habit

        // Save new points in client's local storage
        AsyncStorage.setItem("habit", JSON.stringify(response.data));

        return response.data;
    } catch (err) {
        if (err.response && err.response.status === StatusCodes.UNAUTHORIZED) {
            logout(); // Session is expired/invalid, so logout
        }
        return null;
    }
}
