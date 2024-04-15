import { Router } from "express";
import { findUser, UserFromRequest } from "../controllers/userController.js";
import { updatePoints, findPoints } from "../controllers/pointsController.js";
import {
    addHabit,
    retrieveHabitsByCategory,
    deleteHabit,
} from "../controllers/habitController.js";
import { addAsset, getAssets, setActiveAssets } from "../controllers/assetsController.js";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/user", findUser);

/* ************ Points Routes ************ */
// Update a user's points
router.post("/points/update", async(req, res) => {
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

// Get a User's points
router.get("/points", async(req, res) => {
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

/* ************ Habits Routes ************ */

// Route to add habits by category for a user
router.post("/habits/add", async(req, res) => {
    const user = await UserFromRequest(req); // Get user from request
    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "User not authenticated" });
    }
    console.log("User: ", user); // Log user
    const habit = req.body.habit; // Get habit from request
    const newHabit = await addHabit(user._id, habit); // Add habit
    if (!newHabit) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Error adding habit" });
    }
    console.log("New habit: ", newHabit);
    return res.status(StatusCodes.OK).json({ habit: newHabit });
});

// Route to get habits by category for a user
router.get("/habits/:categoryName", async(req, res) => {
    const user = await UserFromRequest(req);
    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "User not authenticated" });
    }

    const categoryName = req.params.categoryName;
    try {
        const habits = await retrieveHabitsByCategory(user._id, categoryName);
        if (habits.length === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "No habits found for this category" });
        }
        return res.status(StatusCodes.OK).json({ habits });
    } catch (err) {
        console.error(err);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Error retrieving habits" });
    }
});

// Route to delete a habit
router.delete("/habits/:habitId", async(req, res) => {
    const user = await UserFromRequest(req);
    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "User not authenticated" });
    }

    const habitId = req.params.habitId;
    try {
        const success = await deleteHabit(habitId);
        if (!success) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Habit not found or error deleting habit" });
        }
        return res
            .status(StatusCodes.OK)
            .json({ message: "Habit deleted successfully" });
    } catch (err) {
        console.error(err);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Error deleting habit" });
    }
});

/* ************ Assets Routes ************ */

// Gets the assets Object for a user. Includes owned assets and active assets
router.get("/assets", async(req, res) => {
    const user = await UserFromRequest(req);
    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "User not authenticated" });
    }

    const foundAssets = await getAssets(user._id);
    if (!foundAssets) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Error finding assets" });
    }
    console.log("Found assets: ", foundAssets);
    return res.status(StatusCodes.OK).json({ assets: foundAssets });
});


// Add an asset to the user's assets
router.post("/assets/add", async(req, res) => {
    const user = await UserFromRequest(req);
    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "User not authenticated" });
    }

    // Eg. req.body.assets: {type: "tops", name: "yale_shirt"}
    const assetType = req.body.assets.type;
    const assetName = req.body.assets.name;

    // Updated assets is the JSON of the assets as represented in the assets schema
    const updatedAssets = await addAsset(user._id, assetType, assetName);
    if (!updatedAssets) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Error adding asset" });
    }
    console.log("Updated assets: ", updatedAssets);
    return res.status(StatusCodes.OK).json({ assets: updatedAssets });
});


router.post("/assets/setActive", async(req, res) => {
    const user = await UserFromRequest(req);
    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "User not authenticated" });
    }

    // req.body.assets is the JSON of active assets for the user
    // req.body.assets: {tops: "yale_shirt", bottoms: "yale_pants", accessories: "yale_hat"}
    const assets = req.body.assets;

    // Updated assets is the JSON of the assets as represented in the assets schema
    const updatedAssets = await setActiveAssets(user._id, assets);
    if (!updatedAssets) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Error setting active asset" });
    }
    console.log("Updated assets: ", updatedAssets);
    return res.status(StatusCodes.OK).json({ assets: updatedAssets });
});


export default router;