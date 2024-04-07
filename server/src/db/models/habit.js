import mongoose from "mongoose";

/**
 * Mongoose model for Habit.
 *
 * @requires mongoose
 *
 * @description
 * Represents a habit in the database
 *
 *
 * @typedef {Object} Habit
 * @property {mongoose.Schema.Types.ObjectId} user_id - user_id for the habit.
 * @property {String} title - title given to the habit by the user.
 * @property {String} category - category of habit: eating, sleeping, excercising, studying.
 * @property {String} description - optional description given to the habit by the user.
 * @property {Date} date_and_time - timestamp of habit.
 * @property {Object} details - The details pertaining to each individual habit.
 */

// Habit schema
const habitSchema = new mongoose.Schema({
    //mongoose creates automatically a unique _id for each row
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "User"
    },
    title: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "Category"

    },
    description: { type: String },
    date_and_time: { type: Date },
    details: {
        eating: {
            eating_tag: { type: String, default: "" },
            healthy_meal: { type: Boolean, default: false }
        },
        sleep: {
            sleep_duration: { type: Number, default: 0 },
            quality_of_sleep: { type: String, default: "" },
            is_nap: { type: Boolean, default: false }
        },
        study: {
            study_duration: { type: Number, default: 0 },
            study_productivity: { type: String, default: "" }
        },
        workout: {
            workout_tag: { type: String, default: "" },
            workout_duration: { type: Number, default: 0 },
            workout_intensity: { type: String, default: "" }
        },
        any: mongoose.Schema.Types.Mixed

    }
});

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;