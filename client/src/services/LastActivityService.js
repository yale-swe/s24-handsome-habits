import Api from "./apiUtil";
import { updatePointswithChange } from "./PointsService";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Threshold for hours since last activity for each category
 * eg "Category": { "Threshold in hours": "Point decrement" }
 * These values should always be negative. (Since we're decrementing points)
 */
const thresholds = {
    Exercising: { 24: -10, 48: -10, 72: -10 },
    Eating: { 8: -15, 16: -10 },
    Studying: { 24: -10, 48: -15 },
    Sleeping: { 12: 0, 24: -15, 36: -15 },
};

/**
 * Checks the activity duration for each category and updates points if the activity was too long ago.
 */
export async function checkAndUpdateActivity() {
    try {
        // Retrieve the last activity times for all categories
        const lastActivities = await retrieveLastActivity();
        if (!lastActivities) {
            console.error("Failed to retrieve last activities.");
            return;
        }

        const decrementData =
            (await AsyncStorage.getItem("lastDecrementTimes")) || "{}";
        const lastDecrementTimes = JSON.parse(decrementData);

        // Decrement time periods
        const decrementAfter = {
            Exercising: 24,
            Eating: 8,
            Studying: 24,
            Sleeping: 12,
        };

        const categoryToKey = {
            Exercising: "last_exercising",
            Eating: "last_eating",
            Studying: "last_studying",
            Sleeping: "last_sleeping",
        };

        const now = new Date();

        for (const category of Object.keys(thresholds)) {
            const lastActivityTime = new Date(lastActivities[categoryToKey[category]]);
            console.log("Last activity time: ", lastActivityTime.toISOString());
            const hoursElapsed = (now - lastActivityTime) / (1000 * 60 * 60); // ms to hours

            const lastDecrementTime = lastDecrementTimes[category] ?
                new Date(lastDecrementTimes[category]) :
                now;

            const hoursSinceLastDecrement =
                (now - lastDecrementTime) / (1000 * 60 * 60); // ms to hours

            console.log("Last decrement time: ", lastDecrementTime.toISOString());

            if (!lastDecrementTimes[category]) {
                // If no last decrement time is available, set it to now and skip decrementing
                lastDecrementTimes[category] = now.toISOString();
            } else if (hoursSinceLastDecrement > decrementAfter[category]) {

                const valueToDecrement = threshholdValue(hoursElapsed, category);

                // No points to decrement because it hasn't been long enough
                if (valueToDecrement == 0) { continue; }

                console.log(`Last activity for ${category} was too long ago. Updating points.`);

                // Update points and save time in local storage
                await updatePointswithChange(category, { "points": valueToDecrement });
                lastDecrementTimes[category] = now.toISOString();
                await AsyncStorage.setItem("lastDecrementTimes", JSON.stringify(lastDecrementTimes));
            } else {
                console.log(`Last activity for ${category} was not too long ago.`);
            }
        }
    } catch (err) {
        console.error("Error in checking and updating activities:", err);
    }
}

function threshholdValue(hoursElapsed, category) {
    let threshhold = 0;
    for (const key of Object.keys(thresholds[category])) {
        if (hoursElapsed >= key) {
            threshhold = thresholds[category][key];
        }
    }
    return threshhold;
}
/**
 * Updates the last activity for a given category.
 * @param {String} category - The category to update.
 * @returns {Promise<JSON|null>} - The updated last activity if successful; otherwise, null.
 */
export async function updateLastActivity(category) {
    try {
        console.log("updating last activity for the category: ", category);
        const response = await Api.post("/lastActivity/update", { category });
        return response.data;
    } catch (err) {
        console.error("Error updating last activity:", err);
        return null;
    }
}

/**
 * Retrieves the last activity for a user.
 * @returns {Promise<JSON|null>} - The last activity if successful; otherwise, null.
 */
export async function retrieveLastActivity() {
    try {
        const response = await Api.get("/lastActivity");
        return response.data;
    } catch (err) {
        console.error("Error retrieving last activity:", err);
        return null;
    }
}
