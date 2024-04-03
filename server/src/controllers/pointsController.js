import Category from "../db/models/category.js";
import Points from "../db/models/points.js";
import Habit from "../db/models/habit.js";
import User from "../db/models/user.js";

export async function createPoints(user_id) {
  try {
    const newPoints = new Points({ user_id: user_id });
    return newPoints.save();
  } catch (err) {
    console.log("Points already exists");
    return null;
  }
}

export async function findPoints(user_id) {
  console.log("Finding points");
  try {
    let foundPoints = await Points.findOne({
      user_id: user_id,
    });

    if (!foundPoints) {
      console.log("User's points not found");
      return null;
    }

    let lastUpdatedTimes = await getLastUpdatedTimes(user_id);
    foundPoints["last_updated"] = lastUpdatedTimes;
    console.log("Found points: ", foundPoints);

    return foundPoints;
  } catch (error) {
    console.log("Error finding points");
    return null;
  }
}

export async function deletePoints(user_id) {
  return Points.deleteOne({ user_id: user_id });
}

/**
 *
 * @param {*} user_id : _id of the user
 *
 * @param {*} user_id : _id of the user
 * @param {*} newPoints : JSON of the user's points
 * @returns a non null value on successful points update, null on failure
 */
export async function updatePoints(user_id, newPoints) {
  try {
    // {new: true} means return the document with updated values
    const userPoints = await Points.findOneAndUpdate(
      { user_id: user_id },
      newPoints,
      { new: true }
    );
    return userPoints;
  } catch (err) {
    console.log("Points not found");
    return null;
  }
}

/**
 * Get the last updated for a user's habits in all categories
 * @param {*} user_id - ObjectID created by MongoDB
 * @returns {JSON} - {category.name : lastUpdatedDate} for all categories
 */
async function getLastUpdatedTimes(user_id) {
  try {
    // find all the categories in the category collection
    const categories = await Category.find({});
    const lastUpdatedTimes = {};

    for (const category of categories) {
      console.log("Category is ", category);

      let habit = await Habit.find({
        user_id: user_id,
        category_id: category._id,
      })
        .sort({ last_updated: -1 })
        .limit(1); // Most recent habit logged for category

      let lastUpdated;

      // If no habit has been created for that category, set last updated to user's creation date
      if (habit.length === 0) {
        lastUpdated = await User.findOne({ _id: user_id }).date_created;
        console.log("Last updated is the user creation date");
      } else {
        lastUpdated = category.last_updated;
      }
      console.log("Last updated for", category.name, "is ", lastUpdated);

      // convert to lower case for standardization throughout code of app
      lastUpdatedTimes[category.name.toLowerCase()] = lastUpdated;
    }

    return lastUpdatedTimes;
  } catch (err) {
    console.log("Error getting last updated times ", err);
    return null;
  }
}
