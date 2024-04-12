import Assets from "../db/models/assets.js";

export async function createInitialAssets(user_id) {
    try {
        const newAssets = new Assets({ user_id: user_id });
        return newAssets.save();
    } catch (err) {
        console.log("Error creating initial assets object");
        return null;
    }
}

export async function getAssets(user_id) {
    try {
        return Assets.findOne({ user_id: user_id });
    } catch {
        console.log("Error getting assets");
        return null;
    }
}

export async function updateAssets(user_id, assets) {
    try {
        return await Assets.findOneAndUpdate({ user_id: user_id }, assets);
    } catch (err) {
        console.log("Error updating assets");
        return null;
    }
}