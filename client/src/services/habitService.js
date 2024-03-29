import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Adds a new habit for the user.
 * @param {JSON} newHabit - The new habit to add.
 * newHabit should contain:
 * {
 *   title: String,
 *   category_name: String,
 *   description: String,
 *   date_and_time: Date,
 *   details: {
 *      eating: { eating_tag: String, healthy_meal: Boolean },
        sleep: {sleep_duration: Number, quality_of_sleep: Number },
        study: { study_duration: Number, study_productivity: Number },
        workout: { workout_tag: "String, workout_duration: Number, workout_intensity: String }
 *   },
 *   date_and_time: Date,
 * }
 * @returns {JSON|null} - The added habit data if successful; otherwise, null.
 */
export async function addHabit(newHabit) {
export async function addHabit(newHabit) {
    try {

        const response = await Api.post("/habits/add", {
            habit: newHabit,
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
