import Habit from "../db/models/habit.js";
import Category from "../db/models/category.js";


/**
 *
 * @param {*} user_id : _id of the user
 * @param {*} newHabit : the data of the habit
 * newHabit should contain:
 * {
 *   title: String,
 *   category_name: String,
 *   description: String,
 *   date_and_time: Date,
 *   details: {  -- just one of the following details objects
 *      eating: { eating_tag: String, healthy_meal: Boolean },
        sleep: {sleep_duration: Number, quality_of_sleep: Number },
        study: { study_duration: Number, study_productivity: String },
        workout: { workout_tag: "String, workout_duration: Number, workout_intensity: String }
 *   },
 *   date_and_time: Date,
 * }
 * @returns a non null value on successful new habit, null on failure
 */
export async function addHabit(user_id, newHabit) {
    try {

        const category = await Category.findOne({ category_name: newHabit.category_name });
        const habitData = { ...newHabit, user_id: user_id, category: category._id};
        const userHabit = new Habit(habitData);
        await userHabit.save();
        return userHabit;
    } catch (err) {
        console.log("Unable to add habit: ", err);
        return null;
    }
}

/**
 * Retrieves all habits for a specific user and category.
 *
 * @param {mongoose.Schema.Types.ObjectId} user_id - The user's ID.
 * @param {String} categoryName - The name of the category.
 * @returns {Promise<Array>} An array of habit objects on success, or an empty array if no habits found.
 */
export async function retrieveHabitsByCategory(user_id, categoryName) {
    try {
        // Find the category ID by its name
        const category = await Category.findOne({ category_name: categoryName });
        if (!category) {
            throw new Error(`Category ${categoryName} not found`);
        }

        // Retrieve all habits for the given user and category ID
        const habits = await Habit.find({ user_id: user_id, category: category._id });
        return habits;
    } catch (err) {
        console.error("Error retrieving habits:", err);
        throw err;
    }
}

/**
 * Deletes a habit based on its ID.
 *
 * @param {mongoose.Schema.Types.ObjectId} habitId - The ID of the habit to delete.
 * @returns {Promise<boolean>} True if the habit was successfully deleted, false otherwise.
 */
export async function deleteHabit(habitId) {
    try {
        const result = await Habit.deleteOne({ _id: habitId });
        return result.deletedCount === 1;
    } catch (err) {
        console.error("Error deleting habit:", err);
        return false;
    }
}