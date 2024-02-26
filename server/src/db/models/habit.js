import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

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
 * @property {String} id - Unique id for the habit.
 * @property {String} user_id - user_id for the habit.
 * @property {String} title - title given to the habit by the user.
 * @property {String} category - category of habit: eating, sleeping, excercising, studying.
 * @property {String} description - optional description given to the habit by the user.
 * @property {Date} date_and_time - timestamp of habit.
 * @property {String} tag - the habit tag.
 * @property {Int32} duration - The duration of the habit.
 * @property {Int32} quality - The quality of the habit.
 */

// Profile for Yale students
const habitSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true,
        unique: false
    },
    title: { type: String },
    category: { type: String },
    description: { type: String },
    date_and_time: { type: Date },
    tag: { type: String },
    duration: { type: Int32 },
    quality: { type: Int32 },
});

const Habit = mongoose.model('User', habitSchema);

export default Habit;