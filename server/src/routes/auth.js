import { Router } from 'express';

const router = Router();

router.post('/login', async(req, res) => {
    console.log("Logging in with Google")
    var token = req.body.token;

    if (!token) return;

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
});

export default router;