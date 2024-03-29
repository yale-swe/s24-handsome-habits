import { Router } from "express";
import { findUser, UserFromRequest } from "../controllers/userController.js";
import { updatePoints, findPoints } from "../controllers/pointsController.js";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/user", findUser);

// Update a user's points
router.post("/points/update", async (req, res) => {
  const user = await UserFromRequest(req); // Get user from request
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "User not authenticated" });
  }

  const points = req.body.points; // Get points from request
  const updatedPoints = await updatePoints(user._id, points); // Update points
  if (!updatedPoints) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error updating points" });
  }
  console.log("Updated points: ", updatedPoints);
  return res.status(StatusCodes.OK).json({ points: updatedPoints });
});

router.get("/points", async (req, res) => {
  const user = await UserFromRequest(req);
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "User not authenticated" });
  }

  const foundPoints = await findPoints(user._id);
  if (!foundPoints) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error finding points" });
  }
  console.log("Found points: ", foundPoints);
  return res.status(StatusCodes.OK).json({ points: foundPoints });
});

export default router;
