import User from '../db/models/user.js';
import { StatusCodes } from 'http-status-codes';

export async function createUser(user) {
    try {
        const newUser = new User(user);
        return newUser.save();
    } catch (err) {
        console.log('User already exists');
        return null;
    }
}

export async function findUser(req, res) {
    console.log("Finding user");
    console.log(req.session);
    if (!req.session.user) {
        console.log("Not logged in");
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "User not authenticated" });
    }
    try {
        const user = await User.findOne({
            id: req.session.user.user.id,
        });

        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "User not found" });
        } else {
            res.status(StatusCodes.OK).json({ user: user });
        }
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
}

export async function deleteUser(username) {
    return User.deleteOne({ username: username });
}