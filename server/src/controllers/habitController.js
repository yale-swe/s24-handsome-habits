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
        study: { study_duration: Number, study_productivity: Number },
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