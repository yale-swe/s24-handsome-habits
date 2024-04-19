import { Router } from "express";
import { CASLogin, CASLogout, LoginWithActiveSession } from "../controllers/authentication/casAuthController.js";
import { GoogleLogin } from "../controllers/authentication/googleAuthController.js";
import { DummyLogin } from "../controllers/authentication/DummyAuthController.js";

const router = Router();

router.get("/cas/login", CASLogin);
router.get("/cas/logout", CASLogout);

router.post("/google/login", GoogleLogin);

router.get("/login", LoginWithActiveSession);

router.post("/dummy_login", DummyLogin);

export default router;