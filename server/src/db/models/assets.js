import mongoose from "mongoose";

/**
 * Mongoose model for Assets.
 *
 * @requires mongoose
 *
 * @description
 * Represents a user's Assets in the database
 *
 *
 * @typedef {Object} Assets
 * @property {mongoose.Schema.Types.ObjectId} user_id - user_id for the Assets.
 * @property {String[]} tops - list of tops a user owns.
 * @property {String[]} pants - list of pants a user owns.
 * @property {String[]} extras - list of extras a user owns.
 */

// Assets for users
const assetsSchema = new mongoose.Schema({
    //mongoose creates automatically a unique _id for each row
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User"
    },
    tops: [String],
    pants: [String],
    extras: [String]

});

const Assets = mongoose.model("Assets", assetsSchema);

export default Assets;