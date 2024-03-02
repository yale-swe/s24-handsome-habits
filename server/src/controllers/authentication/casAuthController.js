import passport from "passport";

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
    passport.authenticate("yalecas", (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: "Authentication failed" });
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

export async function CASLogout(req, res) {
    console.log("Logging out");
    // place this in a try catch block to handle errors
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res
                    .status(500)
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
        res.status(500).send({ error: "Could not log out, please try again." });
    }
}