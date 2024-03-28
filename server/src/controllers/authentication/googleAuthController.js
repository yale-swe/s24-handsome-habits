/**
 *
 * @param {
 * } req
 * @param {*} res
 * @returns
 */
export async function GoogleLogin(req, res) {
    console.log("Logging in with Google")

    // Update this token path if necessary
    var token = req.body.token;

    if (!token) return;

    // Fetch user info from Google with the token received
    try {
        const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const user = await response.json();
        res.send(user);
    } catch (e) {
        console.error(e);
    }
}