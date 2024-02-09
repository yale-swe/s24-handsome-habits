import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    date_created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);