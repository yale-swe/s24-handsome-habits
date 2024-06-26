import Points from "../db/models/points.js";

export async function createPoints(user_id) {
    try {
        // create a points json for the user
        const newPoints = new Points({ user_id: user_id });
        // save the points to the db
        return newPoints.save();
    } catch (err) {
        console.log("Points already exists");
        return null;
    }
}

export async function findPoints(user_id) {
    console.log("Finding points");
    try {
        // look up the user's points based on their id
        const foundPoints = await Points.findOne({
            user_id: user_id,
        });

        if (!foundPoints) {
            console.log("User's points not found");
        }

        return foundPoints;
    } catch (error) {
        console.log("Error finding points");
        return null;
    }
}

export async function deletePoints(user_id) {
    try {
        return Points.deleteOne({ user_id: user_id });
    } catch (err) {
        console.log("Error deleting points");
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