import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

/**
 * Mongoose model for PointsTable.
 * 
 * @requires mongoose
 * 
 * @description
 * A table representing a user's coins and wellness points by habit.
 * 
 * @typedef {Object} PointsTable
 * @property {mongoose.Schema.Types.ObjectId} user_id - The user's unique  object id which ties them to the points table.
 * @property {Int32} coins - The number of coins posessed by the user.
 * @property {Int32} exercise_points - A user's wellness points from logging exercise.
 * @property {Int32} eating_points - A user's wellness points from logging eating.
 * @property {Int32} sleeping_points - A user's wellness points from logging sleeping.
 * @property {Int32} studying_points - A user's wellness points from logging studying.
 */

// reward table schema
const pointsTableSchema = new mongoose.Schema({
    //mongoose creates automatically a unique _id for each row
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    coins: { type: Int32, default: 0 },
    exercise_points: { type: Int32, default: 26},
    eating_points: { type: Int32, default: 25 },
    sleeping_points: { type: Int32, default: 27 },
    studying_points: { type: Int32, default: 22 },
    date_created: { type: Date, default: Date.now }
});

const PointsTable = mongoose.model('PointsTable', pointsTableSchema);

export default PointsTable;