import mongoose from 'mongoose';

/**
 * Mongoose model for User.
 * 
 * @module User
 * @requires mongoose
 * 
 * @description
 * Represents a user in the database, specifically tailored for Yale students.
 * This model includes personal information, such as name, college, and academic details.
 * If user signs in throug Yale CAS, the user's information will be fetched from the Yalies API.
 * If user signs in through Google, the user's information will be fetched from Google.
 * Then, the college and academic details will be null;
 * 
 * @typedef {Object} User
 * @property {String} id - Unique id for the User. NetID for Yale students, and _account_id for Google users.
 * @property {String} first_name - The first name of the user.
 * @property {String} middle_name - The middle name of the user.
 * @property {String} last_name - The last name of the user.
 * @property {String} preferred_name - The preferred name of the user.
 * @property {String} college - The college of the user.
 * @property {String} major - The major of the user.
 * @property {String} year - The academic year of the user.
 * @property {String} profilePic - The URL of the user's profile picture.
 */

// Profile for Yale students
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    preferred_name: { type: String },
    college: { type: String },
    major: { type: String },
    year: { type: String },
    profilePic: { type: String },
    isVerified: {
        type: Boolean,
        default: false
    },
    date_created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;