import { Router } from "express";
import { findUser, UserFromRequest } from "../controllers/userController.js";
import { updatePoints } from "../controllers/pointsController.js";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/user", findUser);

// Update a user's points
router.post("/points", async (req, res) => {
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

export default router;
