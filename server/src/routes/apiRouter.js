import { Router } from "express";
import { findUser } from "../controllers/userController.js";

const router = Router();

router.get("/user", findUser);

export default router;