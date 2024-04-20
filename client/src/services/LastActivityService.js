import Api from "./apiUtil";

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
