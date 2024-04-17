// import express from 'express';
// import { StatusCodes } from 'http-status-codes';

// const router = express.Router();


/**
 * Logs in a dummy user.
 *
 * @param {Express.Request} req - The request object from Express.
 * @param {Express.Response} res - The response object from Express.
 * @param {Function} next - The next middleware function in the Express stack.
 * @returns {void}
 */
export function DummyLogin(req, res) {

    // res.send("Logged in with dummy user");
    const user = {
        _id: "661f218ffb721c8b42c405ec",
        account_id: "dummy123",
        first_name: "Dummy",
        last_name: "User",
        email: "dummy@example.com",
        isVerified: true,
      };


    // Store dummy info
    req.session.user = { user };

    const userData = JSON.stringify(user); // Convert user data to a string

    console.log("Dummy user data: ", userData);


    // Send with the user data
    res.send({ message: "Logged in with dummy user", user: userData });

}