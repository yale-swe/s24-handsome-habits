import mongoose from "mongoose";

/**
 * Mongoose model for the category of habits.
 *
 * @requires mongoose
 *
 * @description
 * Represents a category
 *
 *
 * @typedef {Object} Category
 * @property {String[]} category_detail_keys - list of detail keys to look for in a habit of this category.
 * @property {String} category_name - the name of the category.
 */


// LastActivity schema
const lastActivitySchema = new mongoose.Schema({
    //mongoose creates automatically a unique _id for each row
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User"
    },
    last_exercising: { type: Date, default: Date.now },
    last_eating: { type: Date, default: Date.now },
    last_sleeping: { type: Date, default: Date.now },
    last_studying: { type: Date, default: Date.now }
});

const LastActivity = mongoose.model("LastActivity", lastActivitySchema);

export default LastActivity;
