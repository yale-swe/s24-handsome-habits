import passport from "passport";
import { UserFromSession } from "../userController.js";
import { StatusCodes } from "http-status-codes";

/**
 * Authenticates a user using Yale's CAS system.
 *
 * @param {Express.Request} req - The request object from Express.
 * @param {Express.Response} res - The response object from Express.
 * @param {Function} next - The next middleware function in the Express stack.
 * @returns {void}
 * @throws {InternalServerError} - If there is an error during authentication.
 * @throws {UnauthorizedError} - If authentication fails.
 *
 * @example
 * router.get('/auth/cas/login', casAuthController.CASLogin);
 */

export function CASLogin(req, res, next) {
  console.log("Logging in with Yale CAS");
  passport.authenticate("yalecas", async (err, user) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    
    // Necessary to await actual user object and not use a promise
    user = await user;
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Authentication failed" });
    }

    console.log("User Session: ", req.session);

    // Store user information in session upon successful authentication
    // Adjust according to the user object structures
    req.session.user = { user };

    // You can now redirect the user or send a response as needed
    // For example, redirect to a page with user data
    const userData = JSON.stringify(user); // Convert user data to a string

    // Encode the user data
    const encodedUserData = encodeURIComponent(userData);

    // Redirect with the user data
    res.redirect(`${process.env.HOST_URL}/userdata?data=${encodedUserData}`);
  })(req, res, next);
}

/**
 * Checks if there is an active session form the client and returns the user data if found.
 * @param {Express.Request} req - The request object from Express.
 * @param {Express.Response} res - The response object from Express.
 */
export function LoginWithActiveSession(req, res) {
  console.log("Cookies: ", req.cookies);
  if (req.cookies["connect.sid"]) {
    const encodedSession = req.cookies["connect.sid"];
    UserFromSession(encodedSession).then((user) => {
      if (user) {
        // Redirect to the user data page
        const userData = JSON.stringify(user); // Convert user data to a string
        const encodedUserData = encodeURIComponent(userData); // Encode the user data
        res.status(StatusCodes.OK).send({ user: encodedUserData });
      } else {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ error: "No user found. Sign in again" });
      }
    });
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: "No active session found. Sign in again" });
  }
}

export async function CASLogout(req, res) {
  console.log("Logging out");
  // place this in a try catch block to handle errors
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: "Could not log out, please try again." });
      }
      console.log("Session destroyed");
      // Optional: Clear the cookie on client side
      res.clearCookie("connect.sid"); // Adjust cookie name based on your setup

      // Redirect to CAS logout URL or send a response
      res.redirect(`${process.env.HOST_URL}/cas/logout`);
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Could not log out, please try again." });
  }
}
