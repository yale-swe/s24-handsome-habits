import LastActivity from "../db/models/lastActivity.js";

/**
 * Updates the last activity of a user for a specific habit.
 *
 * @param {mongoose.Schema.Types.ObjectId} user_id - The user's ID.
 * @param {String} category - category of habit
 *
 * @returns a non null value on successful update, null on failure
 *
 */

export async function updateLastActivity(user_id, category) {
    try {
        const updateField = `last_${category}`;
        const update = {
            $set: { [updateField]: new Date() } // Set the last activity date to now
        };

        // Use findOneAndUpdate with upsert option
        const lastActivity = await LastActivity.findOneAndUpdate({ user_id: user_id }, update, { new: true, upsert: true });

        // Check if last activity was created or updated
        if (!lastActivity) {
            console.error("Failed to create or update the last activity.");
            return null;
        }
        return lastActivity;
    } catch (err) {
        console.error("Error updating last activity:", err);
        return null;
    }
}

/**
 * Retrieves the last activity of a user.
 *
 * @param {mongoose.Schema.Types.ObjectId} user_id - The user's ID.
 *
 * @returns a non null value on successful retrieval, null on failure
 *
 */

export async function retrieveLastActivity(user_id) {
    try {

        // try to find new user
        let lastActivity = await LastActivity.findOne({ user_id: user_id });

        // If no activity is found, create a new one
        if (!lastActivity) {
            console.log(`No LastActivity record found for user ${user_id}, creating new one.`);
            lastActivity = new LastActivity({
                user_id: user_id,
                last_exercising: new Date(),
                last_eating: new Date(),
                last_sleeping: new Date(),
                last_studying: new Date(),
            });
            await lastActivity.save();
        }
        return lastActivity;
    } catch (err) {
        console.error("Error retrieving last activity:", err);
        return null;
    }
}
