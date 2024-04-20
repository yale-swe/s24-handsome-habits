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

/**
 * Gets the assets object for a user
 * @param {MongoDB ObjectID} user_id
 * @returns the assets object if successful, null otherwise
 */
export async function getAssets(user_id) {
    try {
        return await Assets.findOne({ user_id: user_id });
    } catch {
        console.log("Error getting assets");
        return null;
    }
}

/**
 * Updates the assets for a user
 * @param {MongoDB ObjectID} user_id
 * @param {Object} assets the new assets object
 */
export async function updateAssets(user_id, assets) {
    try {
        return await Assets.findOneAndUpdate({ user_id: user_id }, assets, { new: true });
    } catch (err) {
        console.log("Error updating assets");
        return null;
    }
}


/**
 * Adds an asset to the user's owned assets
 * @param {MongoDB ObjectID} user_id
 * @param {String} asset_type [tops, bottoms, accessories]
 * @param {String} asset the name of the asset
 */
export async function addAsset(user_id, asset_type, asset) {
    try {
        const assets = await getAssets(user_id);
        if (!assets) {
            console.log("No assets found for user");
            return null;
        }
        assets.owned[asset_type].push(asset);
        return await updateAssets(user_id, assets);
    } catch (err) {
        console.log("Error adding asset");
        return null;
    }
}

/**
 * Updates the active assets of the  to the new active assets
 * Doesn't check whether the assets are owned by the user
 * @param {MongoDB ObjectID} user_id
 * @param {JSON} activeAssets Eg. {tops: "yale_shirt", bottoms: "yale_pants", accessories: "yale_hat"}
 * @returns the updated assets object if successful, null otherwise
 */
export async function setActiveAssets(user_id, newActiveAssets) {
    try {
        const assets = await getAssets(user_id);
        if (!assets) {
            console.log("No assets found for user");
            return null;
        }
        assets.active = newActiveAssets;
        return await updateAssets(user_id, assets);
    } catch (err) {
        console.log("Error setting active assets");
        return null;
    }
}