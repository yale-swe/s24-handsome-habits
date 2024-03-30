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
 * @property {String[]} clothes - list of clothing items a user owns.
 * @property {String[]} objects - list of objects/trinkets a user owns.
 * @property {String[]} backgrounds - list of backgrounds owned by the user.
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
    clothes: [String],
    objects: [String],
    backgrounds: [String]

});

const Assets = mongoose.model("Assets", assetsSchema);

export default Assets;