import User from '../db/models/user.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

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
            account_id: req.session.user.user.id,
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


/**
 * Checks if there is an active session form the client and returns the user data if found.
 * @param {String} encodedSession 
 * @returns user object from session if active session & user found. Else, null.
 */
export async function UserFromSession(encodedSession) {
    const session = encodedSession.split(":")[1].split(".")[0];
    if (session) {
        const collection = mongoose.connection.db.collection("sessions");
        const storedSession = await collection.findOne({ _id: session });
        console.log("Session found: ", storedSession);
        if (storedSession) {
            // the objects are nested rather oddly. Hence, this structure
            const user = storedSession.session.user.user;
            console.log("User found in Session is: ", user);
            return user;
        }
    }
    return null;
}