import { createUser } from "../userController.js";

/**
 *
 * @param {} req
 * @param {*} res
 * @returns
 */
export async function GoogleLogin(req, res) {
  console.log("Logging in with Google");

  // Update this token path if necessary
  var token = req.body.token;

  if (!token) return;

  // Fetch user info from Google with the token received
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    let user_info = await response.json();

    console.log("Google User info: ", user_info);

    const user = await createUser({
      account_id: user_info.id,
      first_name: user_info.given_name,
      email: user_info.email,
      last_name: user_info.family_name,
      preferred_name: user_info.given_name,
      profilePic: user_info.picture,
      isVerified: true,
    });

    console.log(user);

    req.session.user = { user };
    console.log("The G session: ", req.session.user);

    const encodedUserData = encodeURIComponent(JSON.stringify(user));

    console.log("Encoded User Data:", encodedUserData);
    // Redirect with the user data
    // res.redirect(`${process.env.HOST_URL}/userdata?data=${encodedUserData}`);
    res.send(user);
  } catch (e) {
    console.error(e);
  }
}
