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

// habit categories
const categorySchema = new mongoose.Schema({
    //mongoose creates automatically a unique _id for each row
    category_detail_keys: [String],
    category_name: {type: String},

});

const Category = mongoose.model("Category", categorySchema);

export default Category;