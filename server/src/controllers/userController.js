import User from "../db/models/user.js";
import { createPoints } from "./pointsController.js";
import { createInitialAssets } from "./assetsController.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export async function createUser(user) {
  try {
    const newUser = await new User(user);
    await newUser.save();
    // User id is the primary key for user; default _id by MongoDB
    createPoints(newUser._id);
    createInitialAssets(newUser._id);
    console.log("New user: ", newUser);
    return newUser;
  } catch (err) {
    console.log("Error creating user: ", err);
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
 *
 * @param {any} req from the client
 * @description uses the UserFromSession function to check for session
 * @returns user object from session if active session & user found. Else, null.
 */
export async function UserFromRequest(req) {
  // console.log("Request from postman: ", req);
  if (req.cookies["connect.sid"]) {
    const encodedSession = req.cookies["connect.sid"];
    return await UserFromSession(encodedSession);
  }
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
      const user = storedSession.session?.user?.user;
      console.log("User found in Session is: ", user);
      return user;
    }
  }
  return null;
}
