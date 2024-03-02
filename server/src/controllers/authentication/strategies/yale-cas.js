import { Strategy as CasStrategy } from "passport-cas2";
import User from "../../../db/models/user.js";
import { createUser } from "../../userController.js";
import yalies from "yalies";
import 'dotenv/config';
const yalies_api = new yalies.API(process.env.YALIES_API_KEY);

/**
 * Configures Passport with a CAS strategy for user authentication.
 *
 * @param {Object} passport - The Passport instance to configure.
 * @example in Express app
 * const passport = require('passport');
 * import passport from 'passport';
 * import yaleCas from './path/to/yale-cas.js';
 * yaleCas(passport);
 *
 * @description
 * This function sets up Passport to use the CAS strategy for authentication.
 * The CAS strategy will handle user logins, creating new user records if they
 * don't exist, and fetching user details from the Yalies API. It expects a
 * `netid` and `profile` from CAS, uses these to check if the user exists in
 * the database, and creates a new user and profile if not.
 */

export default function(passport) {
    passport.use(
        "yalecas",
        new CasStrategy({
                casURL: "https://secure.its.yale.edu/cas",
            },
            // This is the `verify` callback
            async function(netid, profile, done) {
                try {
                    let user = await User.findOne({ account_id: netid });
                    if (!user) {
                        // get user profile via yalies
                        let people = await yalies_api.people({
                            filters: {
                                netid: netid,
                            },
                        });

                        // There must be only one person with the netid
                        if (people.length !== 1) {
                            return done(null, false, {
                                message: "No such user, or too many users",
                            });
                        }

                        const person = people[0];

                        user = createUser({
                            account_id: netid,
                            email: person.email,
                            first_name: person.first_name,
                            last_name: person.last_name,
                            preferred_name: person.preferred_name,
                            college: person.college,
                            year: person.year,
                            major: person.major,
                            profilePic: person.image,
                            isVerified: true,
                        });
                        console.log("New user created: ", user);
                    }
                    return done(null, user);
                } catch (error) {
                    // console.log(error);
                    return done(error);
                }
            }
        )
    );
}