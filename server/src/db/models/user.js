import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    date_created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export const schema = User.schema;
export default User;