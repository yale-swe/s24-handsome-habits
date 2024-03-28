import Points from "../db/models/points.js";

export async function createPoints(user_id) {
    try {
        const newPoints = new Points({ user_id: user_id });
        return newPoints.save();
    } catch (err) {
        console.log("Points already exists");
        return null;
    }
}

/**
 *
 * @param {*} user_id : _id of the user
 * @param {*} newPoints : JSON of the user's points
 * @returns a non null value on successful points update, null on failure
 */
export async function updatePoints(user_id, newPoints) {
    try {
        // {new: true} means return the document with updated values
        const userPoints = await Points.findOneAndUpdate({ user_id: user_id }, newPoints, { new: true });
        return userPoints;
    } catch (err) {
        console.log("Points not found");
        return null;
    }
}