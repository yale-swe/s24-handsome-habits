import { Router } from "express";
import { CASLogin, CASLogout, LoginWithActiveSession } from "../controllers/authentication/casAuthController.js";
import { GoogleLogin } from "../controllers/authentication/googleAuthController.js";

const router = Router();

router.get("/cas/login", CASLogin);
router.get("/cas/logout", CASLogout);

router.post("/google/login", GoogleLogin);

router.get("/login", LoginWithActiveSession);

export default router;