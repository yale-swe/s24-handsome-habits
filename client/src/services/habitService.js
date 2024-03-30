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
    try {

        const habit_response = await Api.post("/habits/add", {
            habit: newHabit,
        }); // Post request to add a new exercise habit

        // Save new points in client's local storage
        AsyncStorage.setItem("habit", JSON.stringify(habit_response.data));

        // Calculate new points
        let pointChange = 0;
        let coins = 0;

        switch(newHabit.category_name) {
            case "Exercising":

                // 5 coins per 5 minutes (for only full 5 minutes)
                pointChange += Math.floor(newHabit.details.workout.workout_duration / 5) * 5;

                // default 3 coins
                coins += 3;

                // 1 additional coin for medium intensity, high intensity, and over 30 minutes
                if (newHabit.details.workout.workout_intensity == "Medium"){ coins += 1};
                if (newHabit.details.workout.workout_intensity == "High"){ coins += 1};
                if (newHabit.details.workout.workout_duration > 30){ coins += 1};

                break;
            
            case "Eating":
                
        }

        // const points_response = await Api.post("/points/update", {
        //     points: newPoints,
        // }); // Post request to update points

        // // Save new points in client's local storage
        // AsyncStorage["points"] = JSON.stringify(points_response.data);

        return habit_response.data;
    } catch (err) {
        if (err.response && err.response.status === StatusCodes.UNAUTHORIZED) {
            logout(); // Session is expired/invalid, so logout
        }
        return null;
    }
}
