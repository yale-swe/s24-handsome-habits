import Api from "./apiUtil";
import { logout } from "./authenticationUtil";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePointswithChange } from "./PointsService";
import { updateLastActivity } from "../services/LastActivityService"; // Adjust the path as necessary

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
        // Save new habit in client's local storage
        AsyncStorage.setItem("habit", JSON.stringify(habit_response.data));

        // Update last activity after successfully adding the habit
        const lastActivityUpdate = await updateLastActivity(newHabit.category_name);
        console.log("category_name: ", newHabit.category_name);
        console.log("Last activity update: ", lastActivityUpdate);
        if (!lastActivityUpdate) {
            console.error("Failed to update last activity");
            // Optionally handle this failure depending on your application needs
        }

        // Update points based on the new habit

        const { points, coins } = calculatePoints(newHabit);

        updatePointswithChange(newHabit.category_name, {
            points: points,
            coins: coins,
        });

        return habit_response.data;
    } catch (err) {
        if (err.response && err.response.status === StatusCodes.UNAUTHORIZED) {
            logout(); // Session is expired/invalid, so logout
        }
        return null;
    }
}

/**
 * Calculates the points and coins for a new habit.
 * @param {JSON} newHabit - The new habit to calculate points for.
 * @returns {JSON} - The points and coins for the new habit.
 */
export function calculatePoints(newHabit) {
    let points = 0;
    let coins = 0;

    switch (newHabit.category_name) {
        case "Exercising":
            // 5 points per 5 minutes (for only full 5 minutes)
            points +=
                Math.floor(newHabit.details.workout.workout_duration / 5) * 5;

            // default 3 coins
            coins += 9;

            // 1 additional coin for medium intensity, high intensity, and over 30 minutes
            if (newHabit.details.workout.workout_intensity == "Medium") {
                coins += 3;
            }
            if (newHabit.details.workout.workout_intensity == "High") {
                coins += 3;
            }
            if (newHabit.details.workout.workout_duration > 30) {
                coins += 3;
            }

            break;

        case "Eating":
            // default points
            points += 9;

            if (newHabit.details.eating.eating_tag == "Snack") {
                coins += 6;
            } else {
                coins += 12;
            }

            if (newHabit.details.eating.healthy_meal) {
                coins += 9;
            }

            break;

        case "Studying":

            // 4 points per 30 minutes (for only full 5 minutes)
            points +=
                Math.floor(newHabit.details.study.study_duration / 30) * 4;

            // default coins
            coins += 6;

            if (newHabit.details.study.study_duration > 30) {
                coins += 6;
            }

            if (newHabit.details.study.study_duration > 60) {
                coins += 3;
            }

            if (newHabit.details.study.study_productivity == "Medium") {
                coins += 6;
            }

            if (newHabit.details.study.study_productivity == "High") {
                coins += 6;
            }



            break;

        case "Sleeping":
            // 4 points per hour (for only full hour)
            points +=
                Math.floor(newHabit.details.sleep.sleep_duration) * 4;

            if (newHabit.details.sleep.is_nap) {
                coins += 6;
            } else {
                coins += Math.floor(newHabit.details.sleep.sleep_duration) * 3; // 3 coins per hour
            }

            break;
    }

    return { points, coins };
}

/**
 * Retrieves habits by category for the logged-in user.
 * @param {String} category_name - The category name to retrieve habits for.
 * @returns {Array|null} - An array of habit objects if successful; otherwise, null.
 */
export async function retrieveHabitsByCategory(category_name) {
    try {
        const response = await Api.get(`/habits/${category_name}`);

        if (
            response.status === StatusCodes.OK &&
            response.data &&
            response.data.habits
        ) {
            return response.data.habits; // Return the habits if the call was successful
        }

        // If the response status is OK but no data found, return null
        return null;
    } catch (err) {
        // Handle specific HTTP errors
        if (err.response) {
            if (err.response.status === StatusCodes.UNAUTHORIZED) {
                logout(); // Session is expired/invalid, so logout
                return null; // Return after logout to stop further execution
            }

            if (err.response.status === StatusCodes.NOT_FOUND) {
                return []; // Return an empty array if no habits are found
            }
        }

        console.error("Error retrieving habits by category:", err);
        return null;
    }
}

/**
 * Deletes a habit for the user.
 * @param {String} habitId - The ID of the habit to delete.
 * @returns {boolean} - True if the habit was successfully deleted; otherwise, false.
 */
export async function deleteHabit(habitId) {
    try {
        const response = await Api.delete(`/habits/${habitId}`);

        if (response.status === StatusCodes.OK) {
            return true; // Habit was successfully deleted
        }

        // If the response status is OK but action was not successful, log the issue and return false
        console.error("Error deleting habit:", response.data);
        return false;
    } catch (err) {
        if (err.response && err.response.status === StatusCodes.UNAUTHORIZED) {
            logout(); // Session is expired/invalid, so logout
        } else {
            console.error("Error deleting habit:", err);
        }
        return false;
    }
}

/**
 * Retrieves the total number of habits for all categories for the logged-in user.
 * @returns {number} - The total count of habits across all categories.
 */
export async function getTotalHabits() {
    const categories = ["Exercising", "Sleeping", "Eating", "Studying"];
    let totalHabits = 0;

    // Retrieve habits for each category and accumulate the counts
    for (const category of categories) {
        const habits = await retrieveHabitsByCategory(category);
        if (habits) {
            totalHabits += habits.length;
        }
    }

    return totalHabits;
}
