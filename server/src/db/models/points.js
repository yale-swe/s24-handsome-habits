import mongoose from 'mongoose';

/**
 * Mongoose model for Points.
 * 
 * @requires mongoose
 * 
 * @description
 * A table representing a user's coins and wellness points by habit.
 * 
 * @typedef {Object} Points
 * @property {mongoose.Schema.Types.ObjectId} user_id - The user's unique  object id which ties them to the points table.
 * @property {Number} coins - The number of coins posessed by the user.
 * @property {Number} exercise_points - A user's wellness points from logging exercise.
 * @property {Number} eating_points - A user's wellness points from logging eating.
 * @property {Number} sleeping_points - A user's wellness points from logging sleeping.
 * @property {Number} studying_points - A user's wellness points from logging studying.
 */

// reward table schema
const pointsSchema = new mongoose.Schema({
    //mongoose creates automatically a unique _id for each row
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    coins: { type: Number, default: 0 },
    exercise_points: { type: Number, default: 26 },
    eating_points: { type: Number, default: 25 },
    sleeping_points: { type: Number, default: 27 },
    studying_points: { type: Number, default: 22 },
    date_created: { type: Date, default: Date.now }
});

const Points = mongoose.model('Points', pointsSchema);

export default Points;